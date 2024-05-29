// src/components/SignUpModal.js
import React from 'react';
import '../assets/styles/SignUpModal.css';
import logo from '../assets/images/Portion-Logo.png';
import googleLogo from '../assets/images/Gmail-logo.png';

const SignUpModal = ({ onClose, onLoginClick, onEmailClick }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <img src={logo} alt="Portion Logo" className="logo" />
          <button className="close-button-modal" onClick={onClose}>×</button>
        </div>
        <h2 className="modal-title">Empowering Healthier Choices Every Day</h2>
        <p className="modal-subtitle">Sign up to order customized meals</p>
        <button className="email-button" onClick={() => { onEmailClick(); onClose(); }}>Continue with email</button>
        <button className="google-button">
          <img src={googleLogo} alt="Google" className="google-logo" />
          Continue with Google
        </button>
        <p className="terms-text">
          By continuing, you agree to the <a href="#">Terms of Service</a> and acknowledge you’ve read our <a href="#">Privacy Policy</a>.
        </p>
        <p className="login-text">Already a member? <span className="link-text" onClick={() => { onLoginClick(); onClose(); }}>Log in</span></p>
      </div>
    </div>
  );
};

export default SignUpModal;
