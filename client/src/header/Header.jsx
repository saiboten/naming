import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  (
    <header className="header">
      <h1 className="header__content"><Link className="link" to="/">Navnevelgeren</Link></h1>
    </header>)
);
