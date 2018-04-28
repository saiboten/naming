import React from 'react';

import { LinkButton } from '../../components/LinkButton';

export const NameSelection = () => (
  <div>
    <ul>
      <li>Junior</li>
      <li>Barn 2</li>
    </ul>
    <LinkButton to="/createname">Lag nytt navn</LinkButton>
    <LinkButton to="/createname">Legg til andres barn</LinkButton>
  </div>);
