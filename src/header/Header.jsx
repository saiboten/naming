import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  (
    <header className="header">
      <div className="header__content">
        <h1 className="heading-primary"><Link to="/">Navnevelgeren</Link></h1>
      </div>
    </header>)
);
