import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../assets/styles/Header.css';
import hamburgerIcon from '../assets/images/hamburger.svg';
import logo from '../assets/images/Portion-Logo.png';
import downArrowIcon from '../assets/images/chevronDown_icon.svg';
import { useCart } from '../contexts/CartContext';
import OrderPreview from './OrderPreview';

const Header = ({ onSignUpClick, onLoginClick }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  const handleLogout = () => {
    logout();
    setActiveLink('Home');
    setMobileNavVisible(false); // Close the mobile nav after logging out
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            {user ? (
              <div className="dropdown-wrapper" ref={dropdownRef}>
                <button className="greeting" onClick={toggleDropdown}>
                  Hello, {user.name || user.email}
                  <img src={downArrowIcon} alt="Dropdown" className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => navigate('/order-status')}>Order Status</button>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="auth-button" onClick={onLoginClick}>Log in</button>
                <button className="auth-button primary" onClick={onSignUpClick}>Sign up</button>
              </>
            )}
          </div>
        </div>
      </div>
      {isMobileNavVisible && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => { setActiveLink('Home'); setMobileNavVisible(false); }} className={activeLink === 'Home' ? 'active' : ''}>Home</Link>
          <Link to="/order" onClick={() => { setActiveLink('Order'); setMobileNavVisible(false); }} className={activeLink === 'Order' ? 'active' : ''}>Order</Link>
          <Link to="/contact-us" onClick={() => { setActiveLink('Contact Us'); setMobileNavVisible(false); }} className={activeLink === 'Contact Us' ? 'active' : ''}>Contact Us</Link>
          {user ? (
            <>
              <Link to="/order-status" onClick={() => setMobileNavVisible(false)} className="auth-button">Order Status</Link>
              <button className="auth-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="auth-button" onClick={() => { onLoginClick(); setMobileNavVisible(false); }}>Log in</button>
              <button className="auth-button" onClick={() => { onSignUpClick(); setMobileNavVisible(false); }}>Sign up</button>
            </>
          )}
        </div>
      )}
      {cartItems.length > 0 && (
        <OrderPreview />
      )}
    </>
  );
};

export default Header;
