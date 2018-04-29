import React from 'react';

import { LinkButton } from '../../components/LinkButton';

import './NameSelection.scss';

export const NameSelection = () => (
  <div className="nameselection">
    <ul className="nameselection__name-list">
      <li className="nameselection__name">Junior</li>
      <li className="nameselection__name">Barn 2</li>
    </ul>
    <div className="nameselection__actions">
      <LinkButton extraClass="nameselection__action button--small" to="/createname">Lag nytt navn</LinkButton>
      <LinkButton extraClass="nameselection__action button--small" to="/createname">Legg til andres barn</LinkButton>
    </div>
  </div>);
