// src/components/ContactUs.js
import React, { useState } from 'react';
import '../assets/styles/ContactUs.css';
import phoneIcon from '../assets/images/contact-us-phoneCall_icon.png'; 
import emailIcon from '../assets/images/contact-us-email_icon.png';
import locationIcon from '../assets/images/contact-us-location_icon.png';
import discordIcon from '../assets/images/contact-us-discord_icon.png';
import instagramIcon from '../assets/images/contact-us-instagram_icon.png';

const ContactUs = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

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
        <div className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email address" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="+1 012 3456 789" />
          </div>
          <div className="form-group">
            <label>Select Subject?</label>
            <div className="radio-group">
              <label><input type="radio" name="subject" /> General Inquiry</label>
              <label><input type="radio" name="subject" /> General Inquiry</label>
              <label><input type="radio" name="subject" /> General Inquiry</label>
              <label><input type="radio" name="subject" /> General Inquiry</label>
            </div>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Write your message.."></textarea>
          </div>
          <button className="send-button">Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
