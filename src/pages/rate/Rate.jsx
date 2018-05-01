import React from 'react';
import { string, any } from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { random } from 'lodash';

import { LinkButton } from '../../components/LinkButton';
import { logProps } from '../../pages/renderer/loadingRenderHoc';

import './Rate.scss';

class RateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hei: '123'
    };

    console.log(this.state.hei);
  }
  /*  rateUp() {

  }

  rateDown() {

  } */

  render() {
    const { id, name } = this.props;
    console.log(id, name);

    return (
      <div className="rate">
        <div className="rate__name">{name.name}</div>
        <div className="rate__buttons">
          <svg className="rate__up">
            <use xlinkHref="../../../img/sprite.svg#icon-thumbs-up" />
          </svg>
          <svg className="rate__down">
            <use xlinkHref="../../../img/sprite.svg#icon-thumbs-down" />
          </svg>
        </div>
        <div className="rate__back-button">
          <LinkButton extraClass="button--small" to="/">Tilbake</LinkButton>
        </div>
      </div>);
  }
}

RateComponent.propTypes = {
  id: string,
  name: any
};

RateComponent.defaultProps = {
  id: '',
  name: {}
};

export const Rate = compose(
  logProps,
  firebaseConnect(() => [
    '/names'
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
      rateUp: (name) => {
        console.log(name);
        firebase.push(`rating/rejected/${name}`, name);
      }
    })
  )
)(RateComponent);
