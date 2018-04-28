import React from 'react';

import { LinkButton } from '../../components/LinkButton';

import './Start.scss';

export const Start = () => (
  <div className="start">
    <div className="start__links">
      <LinkButton extraClass="start__link" to="/register">Ny bruker</LinkButton>
      <LinkButton extraClass="start__link" to="/register">Logg inn</LinkButton>
    </div>
  </div>);
