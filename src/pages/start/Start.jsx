import React from 'react';
import { connect } from 'react-redux';
import { any } from 'prop-types';

import { LinkButton } from '../../components/LinkButton';

import './Start.scss';

const StartComponent = ({ auth }) => (
  <div className="start">
    <div className="start__links">
      <LinkButton extraClass="start__link" to="/login">Logg inn</LinkButton>
      {JSON.stringify(auth)}
    </div>
  </div>);

StartComponent.propTypes = {
  auth: any.isRequired
};


export const Start = connect(({ firebase: { auth } }) => ({ auth }), null)(StartComponent);
