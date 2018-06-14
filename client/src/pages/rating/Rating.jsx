import React from 'react';
import { any, string, func, array, bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { logProps } from '../../pages/renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';
import { Loader } from '../../components/Loader';

import './Rating.scss';

class RenderRatedUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewBadNames: false
    };

    this.toggleViewBadNames = this.toggleViewBadNames.bind(this);
  }

  toggleViewBadNames() {
    this.setState({
      viewBadNames: !this.state.viewBadNames
    });
  }

  render() {
    const {
      myRatings, toggleNameAccepted, nick, matchingRatings, isMultiPlayer
    } = this.props;

    const userIds = Object.keys(myRatings);
    const users = userIds.map(key => ({
      id: key,
      name: myRatings[key].name,
      accepted: myRatings[key].accepted,
      boy: myRatings[key].boy,
    })).sort((a, b) => a.name.localeCompare(b.name));

    const thumbsUpList = users.filter(user => user.accepted);
    const thumbsDownList = users.filter(user => !user.accepted);

    const thumbsUp = thumbsUpList.length === 0 ? <div>Tom liste</div> : thumbsUpList.map(el => (
      <div className="rating__list-element" key={el.name}>
        {el.name}
        <button className="button button--small" onClick={() => toggleNameAccepted(nick, el)}>
          <svg className="rating__down">
            <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
          </svg>
        </button>
      </div>
    ));

    const thumbsDown = thumbsDownList.length === 0 ? <div>Tom liste</div> : thumbsDownList.map(el => (
      <div className="rating__list-element" key={el.name}>
        {el.name}
        <button className="button button--small" onClick={() => toggleNameAccepted(nick, el)}>
          <svg className="rating__up">
            <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
          </svg>
        </button>
      </div>
    ));

    const superNames = isMultiPlayer ? matchingRatings.map(({ name }) => (
      <div className="rating__list-element" key={name}>
        {name}
        {/* <button className="button button--small" onClick={() => toggleNameAccepted(nick, el)}>
          <svg className="rating__up">
            <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
          </svg>
        </button> */}
      </div>)) : null;

    return (
      <div>
        {superNames ? <React.Fragment> <h1>Felles</h1> {superNames}</React.Fragment> : null}
        <h1>Dine valg</h1>
        <h2 className="rating__sub-header heading-primary">Bra navn <svg className="rating__header-icon"><use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" /></svg></h2>
        <div className="rating__list">{thumbsUp}</div>

        <div className="rating__toggle-bad-names-button-container">

          <button className="button button--small rating__toggle-bad-names-button" onClick={this.toggleViewBadNames}>{this.state.viewBadNames ? 'Skjul buu navn' : 'Vis buu navn'}</button>
        </div>
        {this.state.viewBadNames ?
          <React.Fragment>
            <h2 className="rating__sub-header heading-primary">Dårlige navn <svg className="rating__header-icon"><use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" /></svg>
            </h2>
            <div className="rating__list">{thumbsDown}</div>
          </React.Fragment> : null}
      </div>);
  }
}

RenderRatedUsers.propTypes = {
  nick: string.isRequired,
  matchingRatings: array,
  toggleNameAccepted: func.isRequired,
  isMultiPlayer: bool,
  myRatings: any
};


RenderRatedUsers.defaultProps = {
  matchingRatings: [],
  myRatings: {},
  isMultiPlayer: false
};

export const RatingComponent = (props) => {
  const { myRatings, nick } = props;
  const userList = myRatings ? <RenderRatedUsers {...props} /> : <Loader />;

  return (
    <div className="rating">
      {Object.keys(myRatings).length > 10 ? <LinkButton extraClass="rating__back button--small button--secondary" to={`/nick/actions/${nick}`}>Tilbake</LinkButton> : null}
      {userList}
      <LinkButton extraClass="rating__back button--small button--secondary" to={`/nick/actions/${nick}`}>Tilbake</LinkButton>
    </div>);
};

RatingComponent.propTypes = {
  myRatings: any,
  nick: string.isRequired
};

RatingComponent.defaultProps = {
  myRatings: {}
};

export const findHitsOnBoth = (allRatings, me) => {
  if (allRatings === undefined || me === undefined) {
    return undefined;
  }

  const myRatings = Object.keys(allRatings[me]);

  return myRatings.filter((key) => {
    const allUsersRatingsArray = Object.values(allRatings);

    const arrayWithMatch = allUsersRatingsArray.filter(el =>
      el[key] && el[key].accepted);

    return arrayWithMatch.length === allUsersRatingsArray.length;
  }).map(key => allRatings[me][key]);
};

export const Rating = compose(
  logProps,
  firebaseConnect(({ match: { params: { nick } } }) => [
    '/names',
    `/nicknames/${nick}/rating`
  ]),
  connect(
    ({ firebase: { auth: { uid }, data: { nicknames } } }, { match: { params: { nick } } }) =>
      ({
        myRatings: nicknames && nicknames[nick] && nicknames[nick].rating ? nicknames[nick].rating[uid] : {},
        matchingRatings: nicknames && nicknames[nick] && nicknames[nick].rating ? findHitsOnBoth(nicknames[nick].rating, uid) : [],
        isMultiPlayer: nicknames && nicknames[nick] && nicknames[nick].rating && Object.keys(nicknames[nick].rating).length > 1,
        uid,
        nick
      }),
    (dispatch, { firebase }) => ({
      toggleNameAccepted: (nick, nameDetails) => {
        dispatch((dispatcher, getState) => {
          firebase.set(`nicknames/${nick}/rating/${getState().firebase.auth.uid}/${nameDetails.id}`, {
            name: nameDetails.name,
            boy: nameDetails.boy,
            accepted: !nameDetails.accepted
          });
        });
      }
    })
  )
)(RatingComponent);
