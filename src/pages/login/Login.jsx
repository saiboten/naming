import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { LinkButton } from '../../components/LinkButton';
// import GoogleButton from 'react-google-button' // optional

export const LoginComponent = ({ firebase, auth }) => {
  const renderLoadingDone = () => (
    isEmpty(auth)
      ? <span>Not Authed</span>
      : <span>Du er nå logget inn <LinkButton to="/">Fortsett</LinkButton></span>
  );

  return (
    <div>
      <button // <GoogleButton/> button can be used instead
        onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
      >Login With Google
      </button>
      <div>
        <h2>Auth</h2>
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
