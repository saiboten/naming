import React from 'react';

import { array } from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseConnect } from 'react-redux-firebase';

import { LinkButton } from '../../components/LinkButton';

import './NameSelection.scss';

const NameSelectionComponent = ({ nicknames }) => (
  <div className="nameselection">
    <ul className="nameselection__name-list">
      {nicknames.map(nickName => (<li className="nameselection__name">{nickName.nickname}</li>))}
    </ul>
    <div className="nameselection__actions">
      <LinkButton extraClass="nameselection__action button--small" to="/createname">Lag nytt navn</LinkButton>
      <LinkButton extraClass="nameselection__action button--small" to="/createname">Legg til andres barn</LinkButton>
    </div>
  </div>);

NameSelectionComponent.propTypes = {
  nicknames: array
};

NameSelectionComponent.defaultProps = {
  nicknames: []
};

export const NameSelection = compose(
  firebaseConnect((props, store) => ([
    `nicknames/${store.getState().firebase.auth.uid}`
  ])),
  connect(({ firebase: { data, auth } }) => ({
    nicknames: data.nicknames && Object.values(data.nicknames[auth.uid]),
  }))
)(NameSelectionComponent);
