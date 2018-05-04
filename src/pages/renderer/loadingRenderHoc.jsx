import React from 'react';
import { connect } from 'react-redux';
import { any } from 'prop-types';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { LinkButton } from '../../components/LinkButton';
import { Loader } from '../../components/Loader';

export function logProps(WrappedComponent) {
  const NotLoggedIn = () => (
    <div className="component-renderer">
      <div className="component-renderer__links">
        <LinkButton extraClass="component-renderer__link" to="/login">Logg inn</LinkButton>
      </div>
    </div>);

  const ComponentRendererComponent = (props) => {
    const { auth } = props;
    const renderLoadingDone = () =>
      (!isEmpty(auth) ?
        (<WrappedComponent {...props} />) :
        NotLoggedIn());
    return isLoaded(auth) ? renderLoadingDone() : <Loader />;
  };

  ComponentRendererComponent.propTypes = {
    auth: any.isRequired
  };

  return connect(
    ({ firebase: { auth } }) => (
      {
        auth
      }
    ),
    null
  )(ComponentRendererComponent);
}

