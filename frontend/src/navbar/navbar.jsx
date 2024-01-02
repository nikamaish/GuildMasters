// Navbar.js
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import Logout from '../userProfile/Logout';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // If the user is not yet loaded, set up a listener or loading indicator
    if (user === null) {
      // Set up any loading indicator or listener here
    }
  }, [user]);

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
            <li><Link to="/">Home</Link></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact</a></li>
            {user ? (
              // If the user is authenticated, show the logout button
              <Link to="/logout"><FontAwesomeIcon icon={faRightFromBracket}/></Link>
            ) : (
              // If the user is not authenticated, show the user icon
              <Link to="/userProfile"><FontAwesomeIcon icon= {faUser}/> </Link>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
