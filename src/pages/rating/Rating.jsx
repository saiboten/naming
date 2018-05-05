import React from 'react';
import { any, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { logProps } from '../../pages/renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';
import { Loader } from '../../components/Loader';

import './Rating.scss';

const renderRatedUsers = (users) => {
  const thumbsUpList = users.filter(user => user.accepted);
  const thumbsDownList = users.filter(user => !user.accepted);

  const thumbsUp = thumbsUpList.map(el => (
    <div className="rating__list" key={el.name}>
      {el.name}
      <svg className="rating__up">
        <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
      </svg>
    </div>
  ));

  const thumbsDown = thumbsDownList.map(el => (
    <div className="rating__list" key={el.name}>
      {el.name}
      <svg className="rating__down">
        <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
      </svg>
    </div>
  ));

  return (
    <div>
      <h2 className="rating__sub-header">Bra navn</h2>
      {thumbsUp}
      <h2 className="rating__sub-header">Dårlige navn</h2>
      {thumbsDown}
    </div>);
};

export const RatingComponent = ({ rating, uid, nick }) => {
  const userList = rating[uid] && rating[uid][nick] ? renderRatedUsers(Object.values(rating[uid][nick])) : <Loader />;

  return (
    <div className="rating">
      {userList}
      <LinkButton extraClass="rating__back button--small button--secondary" to={`/nick/actions/${nick}`}>Tilbake</LinkButton>
    </div>);
};

RatingComponent.propTypes = {
  rating: any,
  uid: string,
  nick: string.isRequired
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
    () => ({
    })
  )
)(RatingComponent);
