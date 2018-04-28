import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export const LinkButton = ({ children, to, extraClass }) => (
  <Link className={`button ${extraClass}`} to={to}>{children}</Link>
);

LinkButton.propTypes = {
  children: string,
  to: string.isRequired,
  extraClass: string
};

LinkButton.defaultProps = {
  children: '',
  extraClass: ''
};
