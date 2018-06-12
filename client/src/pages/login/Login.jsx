import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { LinkButton } from '../../components/LinkButton';

import './Login.scss';

export const LoginComponent = ({ firebase, auth }) => {
  const renderLoadingDone = () => (
    isEmpty(auth)
      ?
        <button
          className="button login__google-button"
          onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
        >Google
        </button>
      : <div className="login__logged-in">Du er logget inn <LinkButton to="/">Fortsett</LinkButton></div>
  );

  return (
    <div className="login">
      <h2 className="heading-primary">Logg inn med</h2>

      <div className="login__button-wrapper">
        {
        !isLoaded(auth)
        ? <span>Loading...</span>
        : renderLoadingDone()
      }
      </div>
    </div>);
};

LoginComponent.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }).isRequired,
  auth: PropTypes.object.isRequired
};

export const Login = compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginComponent);
