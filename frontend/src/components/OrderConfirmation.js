import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/OrderConfirmation.css';
import orderIllustration from '../assets/images/Order-and-CheckOut-image.png';

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <h1 className="thank-you-text">Thank you for ordering with us!</h1>
      {/* 
      <p className="receipt-text">
        Want your receipt emailed? <span className="enter-email">Enter your email</span>
      </p>
      */}
      <div className="illustration-container">
        <img src={orderIllustration} alt="Order Illustration" className="order-illustration" />
      </div>
      <p className="preparing-text">The restaurant is preparing your order.</p>
      <p className="redirect-text">
        You can <Link to="/order-status" className="redirect-link">check the status of your order here</Link>
      </p>
    </div>
  );
};

export default OrderConfirmation;
