// src/components/ContactUs.js
import React, { useState} from 'react';
import axios from 'axios';
import '../assets/styles/ContactUs.css';
import phoneIcon from '../assets/images/contact-us-phoneCall_icon.png'; 
import emailIcon from '../assets/images/contact-us-email_icon.png';
import locationIcon from '../assets/images/contact-us-location_icon.png';
import discordIcon from '../assets/images/contact-us-discord_icon.png';
import instagramIcon from '../assets/images/contact-us-instagram_icon.png';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/contact', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message,
      });
      setSuccessMessage('Message sent successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 3000); // Hide message after 3 seconds and navigate to main page
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-us-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">Patrick messed something up? Js call him!</p>
      <div className="contact-content">
        <div className="contact-info">
          <h2 className="contact-info-title">Contact Information</h2>
          <div
            className="contact-details"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <img src={phoneIcon} alt="Phone" className="contact-icon" />
            <span>+1 909 680 8214</span>
            {isTooltipVisible && (
              <div className="tooltip">Yep, that's his number right there</div>
            )}
          </div>
          <div className="contact-details">
            <img src={emailIcon} alt="Email" className="contact-icon" />
            <span>patrickliao527@gmail.com</span>
          </div>
          <div className="contact-details">
            <img src={locationIcon} alt="Location" className="contact-icon" />
            <span>3730 McClintock Ave, Los Angeles, CA 90089</span>
          </div>
          <div className="contact-social">
            <img src={discordIcon} alt="Discord" className="social-icon" />
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="+1 012 3456 789"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Select Subject</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="subject"
                  value="General Inquiry"
                  checked={formData.subject === 'General Inquiry'}
                  onChange={handleChange}
                /> General Inquiry
              </label>
              <label>
                <input
                  type="radio"
                  name="subject"
                  value="Forgot Password"
                  checked={formData.subject === 'Forgot Password'}
                  onChange={handleChange}
                /> Forgot Password
              </label>
              <label>
                <input
                  type="radio"
                  name="subject"
                  value="Ordering issues"
                  checked={formData.subject === 'Ordering Issues'}
                  onChange={handleChange}
                /> Ordering Issues
              </label>
              <label>
                <input
                  type="radio"
                  name="subject"
                  value="Other Issues"
                  checked={formData.subject === 'Other Issues'}
                  onChange={handleChange}
                /> Other Issues
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Write your message.."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="send-button" type="submit">Send Message</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
