import React from 'react';
import { number } from 'prop-types';

export const Counter = ({ children }) => (
  <div className="counter">
    <div className="counter__number">{children}</div>
  </div>
);

Counter.propTypes = {
  children: number
};

Counter.defaultProps = {
  children: 0
};
