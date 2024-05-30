import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/IndividualRestaurant.css';
import putInCartIcon from '../assets/images/shopping-cart_icon.png';
import downArrowIcon from '../assets/images/Get-in-cart-down-arrow_icon.png';
import backButtonIcon from '../assets/images/Back_button.png';
import { createOrder } from '../api_services/api';
import { generateMenuItems } from '../utils/dataGenerators';
import HeartEmoji from '../assets/images/Heart_emoji.png';
import HandsUpEmoji from '../assets/images/HandsUp_emoji.png';
import LovingEmoji from '../assets/images/Loving_emoji.png';
import LitEmoji from '../assets/images/Lit_emoji.png';
import SurprisedEmoji from '../assets/images/Surprised_emoji.png';

const emojis = [HeartEmoji, HandsUpEmoji, LovingEmoji, LitEmoji, SurprisedEmoji];

const IndividualRestaurant = ({ restaurant, onBackClick }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const emojiContainerRef = useRef(null);

  useEffect(() => {
    const items = generateMenuItems(restaurant.id, Math.floor(Math.random() * 10 + 5));
    setMenuItems(items);
  }, [restaurant]);

  const handleOrder = (foodItem, event) => {
    event.preventDefault();
    setMousePosition({ x: event.clientX, y: event.clientY });

    const orderData = {
      foodItem: foodItem.name,
      carbohydrates: foodItem.defaultCarbohydrates,
      proteins: foodItem.defaultProteins,
      fats: foodItem.defaultFats,
      price: foodItem.price,
    };

    createOrder(orderData)
      .then((response) => {
        console.log('Order created:', response);
        addFloatingEmojis();
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };

  const addFloatingEmojis = () => {
    const newEmojis = Array.from({ length: 15 }, () => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomOffsetX = (Math.random() - 0.5) * 400;
      const randomoffsetY = (Math.random() - 0.5) * 400;
      return {
        id: Date.now() + Math.random(),
        src: randomEmoji,
        left: mousePosition.x + randomOffsetX,
        top: mousePosition.y + randomoffsetY, 
      };
    });

    setFloatingEmojis((prev) => [...prev, ...newEmojis]);

    // Immediately trigger animation frame
    requestAnimationFrame(() => {
      if (emojiContainerRef.current) {
        emojiContainerRef.current.classList.add('animate');
      }
    });

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((emoji) => !newEmojis.includes(emoji)));
    }, 2000);
  };

  return (
    <div className="individual-restaurant-card">
      <div className="individual-restaurant-header" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <div className="gradient-overlay"></div>
        <img src={backButtonIcon} alt="Back" className="back-button" onClick={onBackClick} />
        <h1 className="restaurant-title">{restaurant.name}</h1>
      </div>
      <div className="individual-restaurant-content">
        {menuItems.map((foodItem, index) => (
          <FoodItemCard key={index} foodItem={foodItem} handleOrder={handleOrder} />
        ))}
      </div>
      <div ref={emojiContainerRef}>
        {floatingEmojis.map((emoji) => (
          <img
            key={emoji.id}
            src={emoji.src}
            alt="Floating Emoji"
            className="floating-emoji"
            style={{ left: emoji.left, top: emoji.top }}
          />
        ))}
      </div>
    </div>
  );
};

const FoodItemCard = ({ foodItem, handleOrder }) => {
  const [macros, setMacros] = useState({
    carbohydrates: foodItem.defaultCarbohydrates,
    proteins: foodItem.defaultProteins,
    fats: foodItem.defaultFats,
    additional1: 0,
    additional2: 0,
    additional3: 0,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMacroChange = (macro, value) => {
    setMacros(prevState => ({
      ...prevState,
      [macro]: prevState[macro] + value
    }));
  };

  const getMacroStyle = (macroValue, defaultValue) => {
    if (macroValue > defaultValue) return { color: 'red' };
    if (macroValue < defaultValue) return { color: 'blue' };
    return { color: 'black' };
  };

  return (
    <div className="food-item">
      <div className="food-details">
        <img src={foodItem.image} alt="Food" className="restaurant-food-image" />
        <div className="food-texts-details">
          <h2 className="food-title">{foodItem.name}</h2>
          <p className="food-price">${foodItem.price}</p>
          <p className="food-calories">Calories: {foodItem.calories}</p>
          <p className="food-ingredients">Ingredients: {foodItem.ingredients}</p>
        </div>
      </div>
      <div className="cart-icon-container" onClick={(event) => {
        if (!isButtonDisabled) {
          setIsButtonDisabled(true);
          handleOrder(foodItem, event);
          setTimeout(() => setIsButtonDisabled(false), 300);
        }
      }}>
        <img src={putInCartIcon} alt="Put in Cart" className="put-in-cart-icon" />
        <img src={downArrowIcon} alt="Down Arrow" className="down-arrow-icon" />
      </div>
      <div className="macronutrients-wrapper">
        <div className="macronutrients">
          <div className="macro-title-column">
            <div className="macro-item">
              <span className="macro-title">Carbohydrates</span>
            </div>
            <div className="macro-item">
              <span className="macro-title">Proteins</span>
            </div>
            <div className="macro-item">
              <span className="macro-title">Fats</span>
            </div>
          </div>
          <div className="macro-value-column">
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.carbohydrates, foodItem.defaultCarbohydrates)}>
                {macros.carbohydrates}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.proteins, foodItem.defaultProteins)}>
                {macros.proteins}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.fats, foodItem.defaultFats)}>
                {macros.fats}g
              </span>
            </div>
          </div>
          <div className="macro-additional-column">
            <div className="macro-item">
              <span className="macro-additional">Additional 1</span>
            </div>
            <div className="macro-item">
              <span className="macro-additional">Additional 2</span>
            </div>
            <div className="macro-item">
              <span className="macro-additional">Additional 3</span>
            </div>
          </div>
          <div className="macro-controls-column">
            <div className="macro-item">
              <div className="macro-controls">
                <button onClick={() => handleMacroChange('additional1', -1)}>-</button>
                <span className="macro-additional-value">{macros.additional1}g</span>
                <button onClick={() => handleMacroChange('additional1', 1)}>+</button>
              </div>
            </div>
            <div className="macro-item">
              <div className="macro-controls">
                <button onClick={() => handleMacroChange('additional2', -1)}>-</button>
                <span className="macro-additional-value">{macros.additional2}g</span>
                <button onClick={() => handleMacroChange('additional2', 1)}>+</button>
              </div>
            </div>
            <div className="macro-item">
              <div className="macro-controls">
                <button onClick={() => handleMacroChange('additional3', -1)}>-</button>
                <span className="macro-additional-value">{macros.additional3}g</span>
                <button onClick={() => handleMacroChange('additional3', 1)}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndividualRestaurant;