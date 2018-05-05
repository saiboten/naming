import React from 'react';

import { any } from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import { LinkButton } from '../../components/LinkButton';

import './NameSelection.scss';

const NameSelectionComponent = ({ nicknames }) => (
  <div className="nameselection">
    <ul className="nameselection__name-list">
      {nicknames ? Object.keys(nicknames).map(nickName => (<li key={nickName} className="nameselection__name"><Link className="link" to={`/nick/actions/${nickName}`}>{nicknames[nickName].nickname}</Link></li>)) : null}
    </ul>
    <p className="nameselection__info">Du kan enten finne nye navn, eller samarbeide med andre om å finne navn.</p>
    <div className="nameselection__actions">
      <LinkButton extraClass="nameselection__action button--small" to="/createname">Nytt navn</LinkButton>
      <LinkButton extraClass="nameselection__action button--small" to="/createname">Samarbeid</LinkButton>
    </div>
  </div>);

NameSelectionComponent.propTypes = {
  nicknames: any
};

NameSelectionComponent.defaultProps = {
  nicknames: {}
};

export const NameSelection = compose(
  firebaseConnect((props, store) => [
    `nicknames/${store.getState().firebase.auth.uid}`
  ]),
  connect(({ firebase: { data, auth } }) => ({
    nicknames: data.nicknames && data.nicknames[auth.uid],
  }))
)(NameSelectionComponent);
