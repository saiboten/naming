import React from 'react';
import { any, string, func, array } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { logProps } from '../../pages/renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';
import { Loader } from '../../components/Loader';

import './Rating.scss';

const renderRatedUsers = (usersObject, toggleNameAccepted, nick, matchingRatings) => {
  console.log(matchingRatings);

  const userIds = Object.keys(usersObject);
  const users = userIds.map(key => ({
    id: key,
    name: usersObject[key].name,
    accepted: usersObject[key].accepted,
    boy: usersObject[key].boy,
  })).sort((a, b) => a.name.localeCompare(b.name));

  const thumbsUpList = users.filter(user => user.accepted);
  const thumbsDownList = users.filter(user => !user.accepted);

  const thumbsUp = thumbsUpList.map(el => (
    <div className="rating__list-element" key={el.name}>
      {el.name}
      <button className="button button--small" onClick={() => toggleNameAccepted(nick, el)}>
        <svg className="rating__down">
          <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
        </svg>
      </button>
    </div>
  ));

  const thumbsDown = thumbsDownList.map(el => (
    <div className="rating__list-element" key={el.name}>
      {el.name}
      <button className="button button--small" onClick={() => toggleNameAccepted(nick, el)}>
        <svg className="rating__up">
          <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
        </svg>
      </button>
    </div>
  ));

  const superNames = matchingRatings.map(({ name }) => (
    <div className="rating__list-element" key={name}>
      {name}
      {/* <button className="button button--small" onClick={() => toggleNameAccepted(nick, el)}>
        <svg className="rating__up">
          <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
        </svg>
      </button> */}
    </div>));

  return (
    <div>
      <h1>Felles</h1>
      {superNames}
      <h1>Dine valg</h1>
      <h2 className="rating__sub-header heading-primary">Bra navn <svg className="rating__header-icon"><use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" /></svg></h2>
      <div className="rating__list">{thumbsUp}</div>
      <h2 className="rating__sub-header heading-primary">Dårlige navn <svg className="rating__header-icon"><use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" /></svg></h2>
      <div className="rating__list">{thumbsDown}</div>
    </div>);
};

export const RatingComponent = ({
  myRatings, nick, toggleNameAccepted, matchingRatings
}) => {
  const userList = myRatings ? renderRatedUsers(myRatings, toggleNameAccepted, nick, matchingRatings) : <Loader />;

  return (
    <div className="rating">
      {userList}
      <LinkButton extraClass="rating__back button--small button--secondary" to={`/nick/actions/${nick}`}>Tilbake</LinkButton>
    </div>);
};

RatingComponent.propTypes = {
  myRatings: any,
  nick: string.isRequired,
  matchingRatings: array,
  toggleNameAccepted: func.isRequired
};

RatingComponent.defaultProps = {
  myRatings: {},
  matchingRatings: [],
  uid: ''
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
        myRatings: nicknames && nicknames[nick] ? nicknames[nick].rating[uid] : {},
        matchingRatings: nicknames && nicknames[nick] ? findHitsOnBoth(nicknames[nick].rating, uid) : [],
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
