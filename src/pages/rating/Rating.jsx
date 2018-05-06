import React from 'react';
import { any, string, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { logProps } from '../../pages/renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';
import { Loader } from '../../components/Loader';

import './Rating.scss';

const renderRatedUsers = (usersObject, toggleNameAccepted, nick) => {
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

  return (
    <div>
      <h2 className="rating__sub-header heading-primary">Bra navn <svg className="rating__header-icon"><use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" /></svg></h2>
      <div className="rating__list">{thumbsUp}</div>
      <h2 className="rating__sub-header heading-primary">Dårlige navn <svg className="rating__header-icon"><use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" /></svg></h2>
      <div className="rating__list">{thumbsDown}</div>
    </div>);
};

export const RatingComponent = ({
  rating, uid, nick, toggleNameAccepted
}) => {
  const userList = rating[uid] && rating[uid][nick] ? renderRatedUsers(rating[uid][nick], toggleNameAccepted, nick) : <Loader />;

  return (
    <div className="rating">
      {userList}
      <LinkButton extraClass="rating__back button--small button--secondary" to={`/nick/actions/${nick}`}>Tilbake</LinkButton>
    </div>);
};

RatingComponent.propTypes = {
  rating: any,
  uid: string,
  nick: string.isRequired,
  toggleNameAccepted: func.isRequired
};

RatingComponent.defaultProps = {
  rating: {},
  uid: ''
};

export const Rating = compose(
  logProps,
  firebaseConnect(({ match: { params: { nick } } }, store) => [
    '/names',
    `/rating/${store.getState().firebase.auth.uid}/${nick}`
  ]),
  connect(
    ({ firebase: { auth: { uid }, data: { rating } } }, { match: { params: { nick } } }) =>
      ({
        rating,
        uid,
        nick
      }),
    (dispatch, { firebase }) => ({
      toggleNameAccepted: (nick, nameDetails) => {
        dispatch((dispatcher, getState) => {
          firebase.set(`rating/${getState().firebase.auth.uid}/${nick}/${nameDetails.id}`, {
            name: nameDetails.name,
            boy: nameDetails.boy,
            accepted: !nameDetails.accepted
          });
        });
      }
    })
  )
)(RatingComponent);
