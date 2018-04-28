import React from 'react';

import { LinkButton } from '../../components/LinkButton';

import './Start.scss';

export const Start = () => (
  <div className="start">
    <LinkButton to="/register">Ny bruker</LinkButton>
    <LinkButton to="/register">Logg inn</LinkButton>
  </div>);
