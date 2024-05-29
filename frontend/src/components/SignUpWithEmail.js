// src/components/SignupWithEmail.js
import React, { useState } from 'react';
import '../assets/styles/SignUpWithEmail.css';
import showHideIcon from '../assets/images/showHide_icon.png';

const SignupWithEmail = ({ onClose, onLoginClick }) => {
  const [profileName, setProfileName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="modal-overlay">
      <div className="signup-container">
        <button className="close-button-modal" onClick={onClose}>×</button>
        <h2 className="signup-title">Create an account</h2>
        <p className="signup-subtitle">
          Already have an account? <span className="login-link" onClick={() => { onLoginClick(); onClose(); }}>Log in</span>
        </p>
        <form onSubmit={handleSignup}>
          <div className="form-group-signup">
            <label>What should we call you?</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter your profile name"
              required
            />
          </div>
          <div className="form-group-signup">
            <label>What's your email?</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-group-signup">
            <label>
              Create a password
              <img
                src={showHideIcon}
                alt="Show/Hide"
                onClick={() => setShowPassword(!showPassword)}
                className="show-hide-icon"
              />
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <p className="password-hint">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>
          <button type="submit" className="signup-button">Create an account</button>
        </form>
        <div className="terms">
          By creating an account, you agree to the <a href="/terms">Terms of use</a> and <a href="/privacy">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default SignupWithEmail;
