import React from 'react';
import { shape, func, bool, string, number } from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { LinkButton } from '../../components/LinkButton';
import { logProps } from '../../pages/renderer/loadingRenderHoc';
import { setName } from '../../state/actions/name';
import { Counter } from '../../components/Counter';

import './Rate.scss';

const RateComponent = ({
  name: { id, name }, rate, getNewName, nick, remainingNamesToVote
}) => {
  const nameOrLoad = id ? (
    <div className="rate__name">{name.name} <Counter>{remainingNamesToVote}</Counter></div>
  ) : <button className="rate__get-name button" onClick={() => getNewName(nick)}>Start sortering</button>;

  const rateButtons = id ? (
    <div className="rate__buttons">
      <svg className="rate__up" onClick={() => rate(nick, id, name, true)}>
        <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
      </svg>
      <svg className="rate__down" onClick={() => rate(nick, id, name, false)}>
        <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
      </svg>
    </div>) : null;

  return (
    <div className="rate">
      {nameOrLoad}
      {rateButtons}

      <div className="rate__back-button">
        <LinkButton extraClass="button--small button--secondary" to={`/nick/actions/${nick}`}>Tilbake</LinkButton>
      </div>
    </div>);
};

RateComponent.propTypes = {
  name: shape({
    name: shape({
      boy: bool,
      name: string
    }),
    id: string
  }),
  rate: func.isRequired,
  getNewName: func.isRequired,
  nick: string.isRequired,
  remainingNamesToVote: number
};

RateComponent.defaultProps = {
  name: {
    name: {
      boy: false,
      name: ''
    }
  },
  remainingNamesToVote: 0
};

export const Rate = compose(
  logProps,
  firebaseConnect(({ match: { params: { nick } } }, store) => [
    '/names',
    `/nicknames/${nick}/rating/${store.getState().firebase.auth.uid}`
  ]),
  connect(
    ({ name: { name }, firebase: { auth: { uid }, data: { names, nicknames } } }, { match: { params: { nick } } }) => {
      const ratedNamesCount = nicknames && nicknames[nick] && nicknames[nick].rating && nicknames[nick].rating[uid] ? Object.keys(nicknames[nick].rating[uid]).length : 0;
      const totalNames = names ? Object.keys(names).length : 0;

      return { name, nick, remainingNamesToVote: totalNames - ratedNamesCount };
    },
    (dispatch, { firebase }) => ({
      getNewName: (nick) => {
        dispatch(setName(nick));
      },
      rate: (nick, id, name, thumbsUp) => {
        dispatch((dispatcher, getState) => {
          firebase.set(`nicknames/${nick}/rating/${getState().firebase.auth.uid}/${id}`, {
            name: name.name,
            boy: name.boy,
            accepted: thumbsUp
          });
          dispatcher(setName(nick));
        });
      }
    })
  )
)(RateComponent);
