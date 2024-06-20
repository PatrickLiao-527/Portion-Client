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
    const createRandomScrollDelay = () => Math.random() * 2000 + 5000;

    const scrollElement = (ref, delay) => {
      if (!ref.current) return;
      ref.current.style.animation = `scroll 20s linear infinite`;
      ref.current.style.animationDelay = `${delay}ms`;
    };

    const initialDelay = createRandomScrollDelay();

    scrollElement(proteinRef, initialDelay);
    scrollElement(carbsRef, initialDelay + 2000);
    scrollElement(fatsRef, initialDelay + 4000);

    consoleText(
      ['Order Meals', 'From Healthy Restaurants', 'That Fit Your Diet'],
      'text',
      ['#302D40']
    );
  }, []);


  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function() {
  
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
      }
    }, 120)
    window.setInterval(function() {
      if (visible === true) {
        con.className = 'console-underscore hidden'
        visible = false;
  
      } else {
        con.className = 'console-underscore'
  
        visible = true;
      }
    }, 400)
  }

  return (
    <div className="top-section">
      <div className="content">
        <div className="console-container">
          <span id="text"></span>
          <div className="console-underscore" id="console">
            &#95;
          </div>
        </div>
        <button className="cta-button" onClick={handleOrderNowClick}>
          Order Now
        </button>
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
