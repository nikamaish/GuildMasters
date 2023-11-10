import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className={`navbar ${showMenu ? 'active' : ''}`}>
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">GuildMasters</Link>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          <div className={`menu-icon ${showMenu ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className="navbar-menu">
          <ul className={`navbar-items ${showMenu ? 'active' : ''}`}>
            {/* Updated Links to navigate to different routes */}
            <li><Link to="/">Home</Link></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact</a></li>
            <li><Link to='/cart'><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
            <li><Link to="/userProfile"><FontAwesomeIcon icon={faUser} /></Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
