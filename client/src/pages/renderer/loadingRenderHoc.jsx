import React from 'react';
import { connect } from 'react-redux';
import { any } from 'prop-types';
import { get, some } from 'lodash';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import {
  branch,
  renderComponent
} from 'recompose';

import { LinkButton } from '../../components/LinkButton';
import { Loader } from '../../components/Loader';

export const renderWhile = (condition, component) =>
  branch(condition, renderComponent(component));

export const spinnerWhileLoading = propNames =>
  renderWhile(
    props => some(propNames, name => !isLoaded(get(props, name))),
    Loader
  );

export const renderIfEmpty = (propsNames, component) =>
  renderWhile(
    // Any of the listed prop name correspond to empty props (supporting dot path names)
    props => some(propsNames, (name) => {
      const propValue = get(props, name);
      return isLoaded(propValue) && isEmpty(propValue);
    }),
    component
  );

export function logProps(WrappedComponent) {
  const NotLoggedIn = () => (
    <div className="component-renderer">
      <div className="component-renderer__links">
        <h2 className="heading-primary">For å kunne bruke tjenesten må du være innlogget.</h2>
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

