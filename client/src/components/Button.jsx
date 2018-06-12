import React from 'react';
import { string, func, bool } from 'prop-types';

export const Button = ({
  text, onClick, disabled, modifier
}) => (
  <button className={modifier ? `button ${modifier}` : 'button'} onClick={onClick} disabled={disabled}>{text}</button>
);

Button.propTypes = {
  text: string,
  onClick: func,
  disabled: bool,
  modifier: string
};

Button.defaultProps = {
  text: '',
  onClick: e => e,
  disabled: false,
  modifier: ''
};
