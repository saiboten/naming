import React from 'react';
import { LinkButton } from '../../components/LinkButton';

import './Rate.scss';

export const Rate = () => (
  <div className="rate">
    <div className="rate__name">Jens</div>
    <div className="rate__buttons">
      <div className="rate__up">Y</div>
      <div className="rate__down">N</div>
    </div>
    <div className="rate__back-button">
      <LinkButton extraClass="button--small" to="/">Tilbake</LinkButton>
    </div>
  </div>
);
