import React from 'react';
import { string, func, bool } from 'prop-types';

export const Button = ({ text, onClick, disabled }) => (
  <button className="button" onClick={onClick} disabled={disabled}>{text}</button>
);

Button.propTypes = {
  text: string,
  onClick: func,
  disabled: bool
};

Button.defaultProps = {
  text: '',
  onClick: e => e,
  disabled: false
};
