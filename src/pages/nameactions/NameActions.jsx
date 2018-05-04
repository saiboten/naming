import React from 'react';
import { connect } from 'react-redux';
import { any, string } from 'prop-types';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logProps } from '../renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';

import './NameActions.scss';

const NameActionsComponent = ({ nicknames, nick }) => (
  <div className="nameactions">
    <h2>{nicknames[nick] ? nicknames[nick].nickname : ''}</h2>

    <div className="nameactions__buttons">
      <LinkButton to={`/nick/rate/${nick}`}>Sorter</LinkButton>
      <LinkButton to={`/nick/rating/${nick}`}>Aktuelle</LinkButton>
      <LinkButton to={`/nick/administer/${nick}`}>Administrer</LinkButton>
    </div>
    <div>
      <LinkButton extraClass="button--small" to="/">Tilbake</LinkButton>
    </div>

  </div>);


NameActionsComponent.propTypes = {
  nicknames: any,
  nick: string.isRequired
};

NameActionsComponent.defaultProps = {
  nicknames: {}
};

export const NameActions = (
  compose(
    logProps,
    firebaseConnect((props, store) => [
      `nicknames/${store.getState().firebase.auth.uid}`
    ]),
    connect(({ firebase: { data, auth } }, { match: { params: { nick } } }) => ({
      nicknames: data.nicknames && data.nicknames[auth.uid],
      nick
    }))
  )(NameActionsComponent));
