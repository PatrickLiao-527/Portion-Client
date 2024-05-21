// src/components/TopSection.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/TopSection.css';
import mealImage from '../assets/images/banner_image.png';

const TopSection = () => {
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    navigate('/order');
  };

  const proteinRef = useRef(null);
  const carbsRef = useRef(null);
  const fatsRef = useRef(null);

  useEffect(() => {
    const createRandomScrollDelay = () => Math.random() * 2000 + 1000;

    const scrollElement = (ref, delay) => {
      if (!ref.current) return;
      ref.current.style.animation = `scroll 10s linear infinite`;
      ref.current.style.animationDelay = `${delay}ms`;
    };

    const initialDelay = createRandomScrollDelay();

    scrollElement(proteinRef, initialDelay);
    scrollElement(carbsRef, initialDelay + 1000);
    scrollElement(fatsRef, initialDelay + 2000);
  }, []);

  return (
    <div className="top-section">
      <div className="content">
        <h1 className="title">
          Order meals from<br />
          healthy restaurants<br />
          that fit your diet.
        </h1>
        <button className="cta-button" onClick={handleOrderNowClick}>Order Now</button>
      </div>
      <div className="image-container">
        <img src={mealImage} alt="Healthy meal" className="meal-image" />
        <div className="stylistic-circles">
          <div className="bubble">
            <div className="bubble-number-container">
              <ul ref={proteinRef} className="scroll">
                <li>30</li>
                <li>40</li>
                <li>50</li>
                <li>60</li>
              </ul>
            </div>
            <div className="bubble-text">g Protein</div>
          </div>
          <div className="bubble">
            <div className="bubble-number-container">
              <ul ref={carbsRef} className="scroll">
                <li>20</li>
                <li>30</li>
                <li>40</li>
                <li>50</li>
              </ul>
            </div>
            <div className="bubble-text">g Carbs</div>
          </div>
          <div className="bubble">
            <div className="bubble-number-container">
              <ul ref={fatsRef} className="scroll">
                <li>8</li>
                <li>12</li>
                <li>16</li>
                <li>20</li>
              </ul>
            </div>
            <div className="bubble-text">g Fats</div>
          </div>
          <div className="decorative-bubble small" style={{ top: '10%', left: '5%' }}></div>
          <div className="decorative-bubble medium" style={{ top: '30%', left: '1%' }}></div>
          <div className="decorative-bubble large" style={{ top: '30%', left: '50%' }}></div>
          <div className="decorative-bubble small" style={{ top: '15%', right: '50%' }}></div>
          <div className="decorative-bubble medium" style={{ top: '60%', right: '80%' }}></div>
          <div className="decorative-bubble large" style={{ top: '80%', right: '80%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
