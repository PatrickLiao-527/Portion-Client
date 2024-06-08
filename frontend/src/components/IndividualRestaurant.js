import React, { useState, useRef } from 'react';
import '../assets/styles/IndividualRestaurant.css';
import putInCartIcon from '../assets/images/shopping-cart_icon.png';
import downArrowIcon from '../assets/images/Get-in-cart-down-arrow_icon.png';
import backButtonIcon from '../assets/images/Back_button.png';
import { createOrder } from '../services/api';
import { useCart } from '../contexts/CartContext';
import HeartEmoji from '../assets/images/Heart_emoji.png';
import HandsUpEmoji from '../assets/images/HandsUp_emoji.png';
import LovingEmoji from '../assets/images/Loving_emoji.png';
import LitEmoji from '../assets/images/Lit_emoji.png';
import SurprisedEmoji from '../assets/images/Surprised_emoji.png';

const emojis = [HeartEmoji, HandsUpEmoji, LovingEmoji, LitEmoji, SurprisedEmoji];

const IndividualRestaurant = ({ restaurant, onBackClick, menuItems }) => {
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const emojiContainerRef = useRef(null);
  const { addItemToCart } = useCart();

  const handleOrder = (foodItem, macros, event) => {
    event.preventDefault();
    setMousePosition({ x: event.clientX, y: event.clientY });

    const fats = foodItem.baseFat || 0;
    const carbsPrice = foodItem.carbsPrice || 0;
    const proteinsPrice = foodItem.proteinsPrice || 0;

    const orderData = {
      foodItem: foodItem.itemName,
      proteinType: foodItem.proteinType,
      carbohydrates: macros.carbohydrates,
      proteins: macros.proteins,
      fats,
      carbsPrice,
      proteinsPrice,
      fatsPrice: 0.0,
      price: (macros.carbohydrates * carbsPrice) + (macros.proteins * proteinsPrice),
      calories: (macros.carbohydrates * 4) + (macros.proteins * 4) + (fats * 9),
      ownerId: foodItem.ownerId // Ensure ownerId is included
    };

    console.log('Order Data:', orderData);

    addItemToCart(orderData);
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
      const randomOffsetY = (Math.random() - 0.5) * 400;
      return {
        id: Date.now() + Math.random(),
        src: randomEmoji,
        left: mousePosition.x + randomOffsetX,
        top: mousePosition.y + randomOffsetY,
      };
    });

    setFloatingEmojis((prev) => [...prev, ...newEmojis]);

    requestAnimationFrame(() => {
      if (emojiContainerRef.current) {
        emojiContainerRef.current.classList.add('animate');
      }
    });

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((emoji) => !newEmojis.includes(emoji)));
    }, 2000);
  };

  const backgroundImage = restaurant && restaurant.img && restaurant.img.data ? `url(${restaurant.img.data})` : 'default_image_path_here';

  return (
    <div className="individual-restaurant-card">
      <div className="individual-restaurant-header" style={{ backgroundImage }}>
        <div className="gradient-overlay"></div>
        <img src={backButtonIcon} alt="Back" className="back-button" onClick={onBackClick} />
        <h1 className="restaurant-title">{restaurant ? restaurant.name : 'Restaurant'}</h1>
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
    carbohydrates: 10,
    proteins: 5,
    fats: foodItem.baseFat || 0,
  });

  const [additionalCarbs, setAdditionalCarbs] = useState(0);
  const [additionalProteins, setAdditionalProteins] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMacroChange = (macro, value) => {
    if (macro === 'carbohydrates') {
      setAdditionalCarbs((prev) => {
        const newValue = prev + value;
        return newValue < 0 ? 0 : newValue;
      });
      setMacros((prevState) => ({
        ...prevState,
        carbohydrates: prevState.carbohydrates + value < 0 ? 0 : prevState.carbohydrates + value,
      }));
    } else if (macro === 'proteins') {
      setAdditionalProteins((prev) => {
        const newValue = prev + value;
        return newValue < 0 ? 0 : newValue;
      });
      setMacros((prevState) => ({
        ...prevState,
        proteins: prevState.proteins + value < 0 ? 0 : prevState.proteins + value,
      }));
    }
  };

  const calculatePrice = () => {
    const carbsPrice = foodItem.carbsPrice || 0;
    const proteinsPrice = foodItem.proteinsPrice || 0;

    const price = (macros.carbohydrates * carbsPrice) + (macros.proteins * proteinsPrice);
    console.log('Carbs Price:', carbsPrice, 'Proteins Price:', proteinsPrice, 'Calculated Price:', price);
    return price.toFixed(2);
  };

  const calculateCalories = () => {
    const calories = (macros.carbohydrates * 4) + (macros.proteins * 4) + (macros.fats * 9);
    console.log('Calculated Calories:', calories);
    return calories;
  };

  const getMacroStyle = (macroValue, defaultValue) => {
    if (macroValue > defaultValue) return { color: 'red' };
    if (macroValue < defaultValue) return { color: 'blue' };
    return { color: 'black' };
  };

  const imageUrl = foodItem && foodItem.itemPicture ? foodItem.itemPicture : 'default_image_path_here';

  return (
    <div className="food-item">
      <div className="food-details">
        <img src={imageUrl} alt="Food" className="restaurant-food-image" />
        <div className="food-texts-details">
          <h2 className="food-title">{foodItem ? foodItem.itemName : 'Food Item'}</h2>
          <div className="food-price-row">
            <span className="food-price-text">Protein Type:</span>
            <p className="food-price">{foodItem ? foodItem.proteinType : 'N/A'}</p>
          </div>
          <div className="food-price-row">
            <span className="food-price-text">Current Price:</span>
            <p className="food-price">${foodItem ? calculatePrice() : '0.00'}</p>
          </div>
          <div className="food-calories-row">
            <span className="food-calories-text">Calories:</span>
            <p className="food-calories">{foodItem ? calculateCalories() : '0'}</p>
          </div>
        </div>
      </div>
      <div className="cart-icon-container" onClick={(event) => {
        if (!isButtonDisabled) {
          setIsButtonDisabled(true);
          handleOrder(foodItem, macros, event);
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
              <span className="macro-title">Base Fat</span>
            </div>
          </div>
          <div className="macro-value-column">
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.carbohydrates, 10)}>
                {macros.carbohydrates}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.proteins, 5)}>
                {macros.proteins}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.fats, foodItem && foodItem.baseFat ? foodItem.baseFat : 0)}>
                {macros.fats}g
              </span>
            </div>
          </div>
          <div className="macro-controls-column">
            <div className="macro-item">
              <div className="macro-controls">
                <button onClick={() => handleMacroChange('carbohydrates', -1)}>-</button>
                <span className="macro-additional-value">{additionalCarbs}g</span>
                <button onClick={() => handleMacroChange('carbohydrates', 1)}>+</button>
              </div>
            </div>
            <div className="macro-item">
              <div className="macro-controls">
                <button onClick={() => handleMacroChange('proteins', -1)}>-</button>
                <span className="macro-additional-value">{additionalProteins}g</span>
                <button onClick={() => handleMacroChange('proteins', 1)}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualRestaurant;
