import React, { useState } from 'react';
import '../assets/styles/BannerCard.css';

const BannerCard = ({ title, image, foodImage, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="banner-card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`banner-card-front ${isFlipped ? 'hidden' : ''}`}>
        <img src={foodImage} alt="Food" className="food-image" />
        <div className="overlay"></div>
        <img src={image} alt="Title" className="title-image" />
        <h2 className="banner-title">{title}</h2>
      </div>
      <div className={`banner-card-back ${isFlipped ? '' : 'hidden'}`}>
        <img src={foodImage} alt="Food" className={`food-image ${isFlipped ? 'dim' : ''}`} />
        <div className="banner-back-text">
          <h2>{title}</h2>
          <p>{description}</p>
          <ul>
            <li>xxx</li>
            <li>xxx</li>
          </ul>
          <p>Perfect For [Audience Description]</p>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
