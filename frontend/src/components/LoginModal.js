// src/components/LoginModal.js
import React, { useState } from 'react';
import '../assets/styles/LoginModal.css';
import logo from '../assets/images/Portion-Logo.png';
import googleLogo from '../assets/images/Gmail-logo.png';
import showHideIcon from '../assets/images/showHide_icon.png';

const LoginModal = ({ onClose, onSignUpClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container login-container">
      <button className="close-button-modal" onClick={onClose}>×</button>
        <div className="modal-header">
          <img src={logo} alt="Portion Logo" className="logo" />
          <button className="close-button-modal" onClick={onClose}>×</button>
        </div>
        <h2 className="modal-title login-title">Log in to your account</h2>
        <div className="form-group-login">
          <label>Email</label>
          <input type="email" placeholder="Enter your email address" />
        </div>
        <div className="form-group-login">
            <div className = "form-group-login-title">
            <label>Password</label>
            <img
                src={showHideIcon} 
                alt="Show/Hide"
                className="show-hide-icon"
                onClick={togglePasswordVisibility}
            />
            </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <button className="login-button">Log in</button>
        <div className="login-divider">OR Continue with</div>
        <button className="google-login-button">
          <img src={googleLogo} alt="Google" className="google-logo" />
          Google
        </button>
        <p className="signup-text">Don't have an account? <span className="link-text" onClick={() => { onSignUpClick(); onClose(); }}>Sign up</span></p>
      </div>
    </div>
  );
};

export default LoginModal;
