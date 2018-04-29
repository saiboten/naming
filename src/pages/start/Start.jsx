import React from 'react';
import { connect } from 'react-redux';
import { any } from 'prop-types';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import { NameSelection } from '../../pages';
import { LinkButton } from '../../components/LinkButton';


import './Start.scss';

const NotLoggedIn = () => (
  <div className="start">
    <div className="start__links">
      <LinkButton extraClass="start__link" to="/login">Logg inn</LinkButton>
    </div>
  </div>);


const StartComponent = ({ auth }) => {
  const renderLoadingDone = () => (!isEmpty(auth) ? (<NameSelection />) : NotLoggedIn());

  return isLoaded(auth) ? renderLoadingDone() : <div>Loading</div>;
};


StartComponent.propTypes = {
  auth: any.isRequired
};


export const Start = connect(({ firebase: { auth } }) => ({ auth }), null)(StartComponent);
