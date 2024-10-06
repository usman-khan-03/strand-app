import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (user.role === 'professor') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__logo">str(AND)</h1>
      <div className="navbar__actions">
        <span className="navbar__user">Welcome, {user.name}!</span>
        <button onClick={handleHomeClick} className="navbar__button">
          Home
        </button>
        <button onClick={onLogout} className="navbar__button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
