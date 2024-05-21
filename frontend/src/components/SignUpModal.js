import React from 'react';
import '../assets/styles/SignUpModal.css';
import googleLogo from '../assets/images/Gmail-logo.png';

const SignUpModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="logo-placeholder"></div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <h2 className="modal-title">Empowering Healthier Choices Every Day</h2>
        <p className="modal-subtitle">Sign up to order customized meals</p>
        <button className="email-button">Continue with email</button>
        <button className="google-button">
          <img src={googleLogo} alt="Google" className="google-logo" />
          Continue with Google
        </button>
        <p className="terms-text">
          By continuing, you agree to the <a href="#">Terms of Service</a> and acknowledge you’ve read our <a href="#">Privacy Policy</a>.
        </p>
        <p className="login-text">Already a member? <a href="#">Log in</a></p>
      </div>
    </div>
  );
};

export default SignUpModal;
