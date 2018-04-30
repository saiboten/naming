import React from 'react';
import { connect } from 'react-redux';
import { any, string } from 'prop-types';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logProps } from '../renderer/loadingRenderHoc';
import { LinkButton } from '../../components/LinkButton';

import './NameActions.scss';

const NameActionsComponent = ({ nicknames, nameid }) => (
  <div className="nameactions">
    <h2>{nicknames[nameid] ? nicknames[nameid].nickname : ''}</h2>

    <div className="nameactions__buttons">
      <LinkButton to={`/nick/rate/${nameid}`}>Sorter</LinkButton>
      <LinkButton to={`/nick/rating/${nameid}`}>Aktuelle</LinkButton>
    </div>
    <div>
      <LinkButton extraClass="button--small" to="/">Tilbake</LinkButton>
    </div>

  </div>);


NameActionsComponent.propTypes = {
  nicknames: any,
  nameid: string.isRequired
};

NameActionsComponent.defaultProps = {
  nicknames: {}
};

export const NameActions = logProps(compose(
  firebaseConnect((props, store) => [
    `nicknames/${store.getState().firebase.auth.uid}`
  ]),
  connect(({ firebase: { data, auth } }, { match: { params: { nameid } } }) => ({
    nicknames: data.nicknames && data.nicknames[auth.uid],
    nameid
  }))
)(NameActionsComponent));
