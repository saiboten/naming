import React from 'react';
import { string, any, func } from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { random } from 'lodash';

import { LinkButton } from '../../components/LinkButton';
import { logProps } from '../../pages/renderer/loadingRenderHoc';

import './Rate.scss';

const RateComponent = ({
  id, name, thumbsUp, thumbsDown
}) => (
  <div className="rate">
    <div className="rate__name">{name.name}</div>
    <div className="rate__buttons">
      <svg className="rate__up" onClick={() => thumbsUp(id, name)}>
        <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
      </svg>
      <svg className="rate__down" onClick={() => thumbsDown(id, name)}>
        <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
      </svg>
    </div>
    <div className="rate__back-button">
      <LinkButton extraClass="button--small" to="/">Tilbake</LinkButton>
    </div>
  </div>);


RateComponent.propTypes = {
  id: string,
  name: any,
  thumbsUp: func.isRequired,
  thumbsDown: func.isRequired
};

RateComponent.defaultProps = {
  id: '',
  name: {}
};

export const Rate = compose(
  logProps,
  firebaseConnect((props, store) => [
    '/names',
    `/rating/${store.getState().firebase.auth.uid}`
  ]),
  connect(
    ({ firebase: { data: { names } } }) => {
      if (names) {
        const keys = Object.keys(names);
        const randomNumber = random(keys.length);
        const randomID = keys[randomNumber];

        return {
          id: randomID,
          name: names[randomID]
        };
      }
      return {};
    },
    (dispatch, { firebase }) => ({
      thumbsUp: (id, name) => {
        dispatch((dispatcher, getState) => {
          firebase.set(`rating/${getState().firebase.auth.uid}/${id}`, {
            name: name.name,
            boy: name.boy,
            accepted: true
          });
        });
      },
      thumbsDown: (id, name) => {
        dispatch((dispatcher, getState) => {
          firebase.set(`rating/${getState().firebase.auth.uid}/${id}`, {
            name: name.name,
            boy: name.boy,
            accepted: false
          });
        });
      }
    })
  )
)(RateComponent);
