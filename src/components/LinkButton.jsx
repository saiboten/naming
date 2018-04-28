import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export const LinkButton = ({ children, to }) => (
  <Link className="button" to={to}>{children}</Link>
);

LinkButton.propTypes = {
  children: string,
  to: string.isRequired
};

LinkButton.defaultProps = {
  children: ''
};
