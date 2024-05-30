import React from 'react';
import '../assets/styles/OrderConfirmation.css';
import orderIllustration from '../assets/images/Order-and-CheckOut-image.png';
import HeartEmoji from '../assets/images/Heart_emoji.png';
import HandsUpEmoji from '../assets/images/HandsUp_emoji.png';
import LovingEmoji from '../assets/images/Loving_emoji.png';
import LitEmoji from '../assets/images/Lit_emoji.png';
import SurprisedEmoji from '../assets/images/Surprised_emoji.png';

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
        <div className="emoji-container">
          <img src={HeartEmoji} alt="Heart Emoji" className="emoji heart-emoji" />
          <img src={HandsUpEmoji} alt="Hands Up Emoji" className="emoji handsup-emoji" />
          <img src={LovingEmoji} alt="Loving Emoji" className="emoji loving-emoji" />
          <img src={LitEmoji} alt="Lit Emoji" className="emoji lit-emoji" />
          <img src={SurprisedEmoji} alt="Surprised Emoji" className="emoji surprised-emoji" />
        </div>
      </div>
      <p className="preparing-text">The restaurant is preparing your order.</p>
    </div>
  );
};

export default OrderConfirmation;
