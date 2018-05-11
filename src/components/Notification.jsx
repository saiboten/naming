import React from 'react';

import { any } from 'prop-types';

import './Notification.scss';

export const Notification = ({ children }) => (
  <div className="notification">
    <div className="notification__content">
      {children}
    </div>
  </div>
);

Notification.propTypes = {
  children: any.isRequired
};

