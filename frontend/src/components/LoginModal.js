import React, { useState, useContext } from 'react';
import { loginUser } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import '../assets/styles/LoginModal.css';
import logo from '../assets/images/Portion-Logo.png';
import showHideIcon from '../assets/images/showHide_icon.png';

const LoginModal = ({ onClose, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        email,
        password
      };
      const response = await loginUser(userData);
      console.log('Login successful:', response);
      login(response.user);
      onClose();
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const handleGoogleLoginSuccess = (response) => {
    const decoded = decodeJWT(response.credential);
    console.log('Decoded JWT:', decoded);
    if (!decoded.email || !decoded.name || !decoded.sub) {
      console.error('Missing required fields in decoded JWT:', decoded);
      setError('Google login failed. Missing required user information.');
      return;
    }
    const user = {
      email: decoded.email,
      name: decoded.name,
      googleId: decoded.sub,
      imageUrl: decoded.picture,
    };
    login(user);
    onClose();
  };

  const handleGoogleLoginFailure = (error) => {
    setError('Google login failed. Please try again.');
    console.error('Google login error:', error);
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
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group-login">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-group-login">
            <div className="form-group-login-title">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ flex: 1 }}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <div className="login-divider">OR Continue with</div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        />
        <p className="signup-text">Don't have an account? <span className="link-text" onClick={() => { onSignUpClick(); onClose(); }}>Sign up</span></p>
      </div>
    </div>
  );
};

export default LoginModal;