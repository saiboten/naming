import React from 'react';
import { string } from 'prop-types';
import { LinkButton } from '../components/LinkButton';

export const BottomNavigation = ({
  linkBack, linkForward, backText, forwardText
}) => (
  <div>
    <LinkButton to={linkBack}>{backText}</LinkButton>
    <LinkButton to={linkForward}>{forwardText}</LinkButton>
  </div>
);

BottomNavigation.propTypes = {
  linkBack: string,
  linkForward: string,
  backText: string,
  forwardText: string
};

BottomNavigation.defaultProps = {
  linkBack: '',
  linkForward: '',
  backText: '',
  forwardText: ''
};
