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
  const dietRef = useRef(null); 

  useEffect(() => {
    const createRandomScrollDelay = () => Math.random() * 2000 + 5000; // Adjust delay range here

    const scrollElement = (ref, delay) => {
      if (!ref.current) return;
      ref.current.style.animation = `scroll 20s linear infinite`; // Adjust scroll duration here
      ref.current.style.animationDelay = `${delay}ms`;
    };

    const initialDelay = createRandomScrollDelay();

    scrollElement(proteinRef, initialDelay);
    scrollElement(carbsRef, initialDelay + 2000);
    scrollElement(fatsRef, initialDelay + 4000);
    scrollElement(dietRef, initialDelay); // Add scroll effect to diet text
  }, []);

  return (
    <div className="top-section">
      <div className="content">
        <h1 className="top-section-title ">
          Order meals from<br />
          healthy restaurants<br />
          that 
          <span className="scrolling-text-container">
            <ul ref={dietRef} className="scrolling">
              <li>fit your diet</li>
              <li>help you build muscle</li>
              <li>help you lose weight</li>
              <li>keep you healthy</li>
            </ul>
          </span>
        </h1>
        <button className="cta-button" onClick={handleOrderNowClick}>Order Now</button>
      </div>
      <div className="image-container">
        <img src={mealImage} alt="Healthy meal" className="meal-image" />
        <div className="stylistic-circles">
          <div className="bubble">
            <div className="bubble-number-unit-container">
              <div className="bubble-number-container">
                <ul ref={proteinRef} className="scroll">
                  <li>30</li>
                  <li>40</li>
                  <li>50</li>
                  <li>60</li>
                </ul>
              </div>
              <div className="unit">g</div>
            </div>
            <div className="bubble-text">Protein</div>
          </div>
          <div className="bubble">
            <div className="bubble-number-unit-container">
              <div className="bubble-number-container">
                <ul ref={carbsRef} className="scroll">
                  <li>20</li>
                  <li>30</li>
                  <li>40</li>
                  <li>50</li>
                </ul>
              </div>
              <div className="unit">g</div>
            </div>
            <div className="bubble-text">Carbs</div>
          </div>
          <div className="bubble">
            <div className="bubble-number-unit-container">
              <div className="bubble-number-container">
                <ul ref={fatsRef} className="scroll">
                  <li>8</li>
                  <li>12</li>
                  <li>16</li>
                  <li>20</li>
                </ul>
              </div>
              <div className="unit">g</div>
            </div>
            <div className="bubble-text">Fats</div>
          </div>
          <div className="decorative-bubble small" style={{ top: '55%', right: '37%' }}></div>
          <div className="decorative-bubble medium" style={{ top: '30%', right: '30%' }}></div>
          <div className="decorative-bubble medium" style={{ bottom: '20%', left: '1%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
