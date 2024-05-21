import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = ({ onSignUpClick }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveLink('Home');
    } else if (path === '/order') {
      setActiveLink('Order');
    } else if (path === '/contact') {
      setActiveLink('Contact Us');
    }
  }, [location]);

  return (
    <div className="header-wrapper">
      <div className="logo-wrapper">
        <div className="logo"></div>
        <div className="company">Portion</div>
      </div>
      <div className="nav-links">
        <Link to="/" onClick={() => setActiveLink('Home')} className={activeLink === 'Home' ? 'active' : ''}>Home</Link>
        <Link to="/order" onClick={() => setActiveLink('Order')} className={activeLink === 'Order' ? 'active' : ''}>Order</Link>
        <Link to="/contact" onClick={() => setActiveLink('Contact Us')} className={activeLink === 'Contact Us' ? 'active' : ''}>Contact Us</Link>
      </div>
      <div className="auth-buttons">
        <button className="auth-button">Log in</button>
        <button className="auth-button primary" onClick={onSignUpClick}>Sign up</button>
      </div>
    </div>
  );
};

export default Header;
