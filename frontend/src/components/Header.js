// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css';
import hamburgerIcon from '../assets/images/hamburger.svg';
import logo from '../assets/images/Portion-Logo.png';

const Header = ({ onSignUpClick, onLoginClick }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveLink('Home');
    } else if (path === '/order') {
      setActiveLink('Order');
    } else if (path === '/contact-us') {
      setActiveLink('Contact Us');
    }
  }, [location]);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <>
      <div className="header-wrapper">
        <button
          className={`hamburger-menu ${isMobileNavVisible ? 'open' : ''}`}
          id="hamburger-menu"
          onClick={toggleMobileNav}
        >
          <img src={hamburgerIcon} alt="Menu" />
        </button>
        <div className="logo-wrapper">
          <img src={logo} alt="Portion Logo" className="logo-header" />
        </div>
        <div className="nav-container">
          <div className="nav-links">
            <Link to="/" onClick={() => setActiveLink('Home')} className={activeLink === 'Home' ? 'active' : ''}>Home</Link>
            <Link to="/order" onClick={() => setActiveLink('Order')} className={activeLink === 'Order' ? 'active' : ''}>Order</Link>
            <Link to="/contact-us" onClick={() => setActiveLink('Contact Us')} className={activeLink === 'Contact Us' ? 'active' : ''}>Contact Us</Link>
          </div>
          <div className="auth-buttons">
            <button className="auth-button" onClick={onLoginClick}>Log in</button>
            <button className="auth-button primary" onClick={onSignUpClick}>Sign up</button>
          </div>
        </div>
      </div>
      {isMobileNavVisible && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => { setActiveLink('Home'); setMobileNavVisible(false); }} className={activeLink === 'Home' ? 'active' : ''}>Home</Link>
          <Link to="/order" onClick={() => { setActiveLink('Order'); setMobileNavVisible(false); }} className={activeLink === 'Order' ? 'active' : ''}>Order</Link>
          <Link to="/contact-us" onClick={() => { setActiveLink('Contact Us'); setMobileNavVisible(false); }} className={activeLink === 'Contact Us' ? 'active' : ''}>Contact Us</Link>
          <button className="auth-button" onClick={() => { onLoginClick(); setMobileNavVisible(false); }}>Log in</button>
          <button className="auth-button" onClick={() => { onSignUpClick(); setMobileNavVisible(false); }}>Sign up</button>
        </div>
      )}
    </>
  );
};

export default Header;
