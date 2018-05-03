import React from 'react';
import { shape, func, bool, string } from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { LinkButton } from '../../components/LinkButton';
import { logProps } from '../../pages/renderer/loadingRenderHoc';
import { setName } from '../../state/actions/name';

import './Rate.scss';

const RateComponent = ({
  name: { id, name }, rate, getNewName
}) => {
  const nameOrLoad = id ? <div className="rate__name">{name.name} </div> : <button className="rate__get-name button" onClick={getNewName}>Hent navn</button>;

  return (
    <div className="rate">
      {nameOrLoad}
      <div className="rate__buttons">
        <svg className="rate__up" onClick={() => rate(id, name, true)}>
          <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
        </svg>
        <svg className="rate__down" onClick={() => rate(id, name, false)}>
          <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
        </svg>
      </div>
      <div className="rate__back-button">
        <LinkButton extraClass="button--small" to="/">Tilbake</LinkButton>
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
  getNewName: func.isRequired
};

RateComponent.defaultProps = {
  name: {
    name: {
      boy: false,
      name: ''
    }
  }
};

export const Rate = compose(
  logProps,
  firebaseConnect((props, store) => [
    '/names',
    `/rating/${store.getState().firebase.auth.uid}`
  ]),
  connect(
    ({ name: { name } }) => ({ name }),
    (dispatch, { firebase }) => ({
      getNewName: () => {
        dispatch((dispatcher, getState) => {
          const { firebase: { auth: { uid }, data } } = getState();

          const { names, rating } = data;

          if (names) {
            const ratedNames = Object.values(rating[uid]);

            dispatcher(setName(names, ratedNames));
          }
        });
      },
      rate: (id, name, thumbsUp) => {
        dispatch((dispatcher, getState) => {
          const { firebase: { data: { names } } } = getState();
          firebase.set(`rating/${getState().firebase.auth.uid}/${id}`, {
            name: name.name,
            boy: name.boy,
            accepted: thumbsUp
          });
          dispatcher(setName(names));
        });
      }
    })
  )
)(RateComponent);
