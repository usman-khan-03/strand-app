import React from 'react';
import './Navbar.scss';

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">str(AND)</h1>
      <div className="navbar__user">Welcome, {user.name}!</div>
    </nav>
  );
}

export default Navbar;
