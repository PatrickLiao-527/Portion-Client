import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/IndividualRestaurant.css';
import putInCartIcon from '../assets/images/shopping-cart_icon.png';
import downArrowIcon from '../assets/images/Get-in-cart-down-arrow_icon.png';
import backButtonIcon from '../assets/images/Back_button.png';
import { createOrder, fetchMenuItems } from '../services/api';
import { useCart } from '../contexts/CartContext';
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
  const { addItemToCart } = useCart();

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const response = await fetchMenuItems(restaurant._id);
        console.log('Fetched menu items:', response); // Log the fetched data
        if (response && Array.isArray(response.data)) {
          setMenuItems(response.data);
        } else {
          setMenuItems([]); // Ensure menuItems is an array
          console.error('Expected an array but got:', response);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setMenuItems([]); // Ensure menuItems is an array in case of error
      }
    };

    loadMenuItems();
  }, [restaurant]);

  const handleOrder = (foodItem, event) => {
    event.preventDefault();
    setMousePosition({ x: event.clientX, y: event.clientY });

    const orderData = {
      foodItem: foodItem.itemName,
      carbohydrates: 15,
      proteins: 15,
      fats: parseFloat(foodItem.baseFat.$numberDecimal),
      carbsPrice: parseFloat(foodItem.carbsPrice.$numberDecimal),
      proteinsPrice: parseFloat(foodItem.proteinsPrice.$numberDecimal),
      fatsPrice: 0.0, // we are assuming the inherent price calculation is not afected by the fats since the grams of fat is fixed
      price: (15 * parseFloat(foodItem.carbsPrice.$numberDecimal)) +
             (15 * parseFloat(foodItem.proteinsPrice.$numberDecimal)),
      calories: (15 * 4) + (15 * 4) + (parseFloat(foodItem.baseFat.$numberDecimal) * 9)
    };

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
      <div className="individual-restaurant-header" style={{ backgroundImage: `url(${restaurant.img.data})` }}>
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
    carbohydrates: 15,
    proteins: 15,
    fats: parseFloat(foodItem.baseFat.$numberDecimal),
  });

  const [additionalCarbs, setAdditionalCarbs] = useState(0);
  const [additionalProteins, setAdditionalProteins] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMacroChange = (macro, value) => {
    if (macro === 'carbohydrates') {
      setAdditionalCarbs(prev => {
        const newValue = prev + value;
        return newValue < 0 ? 0 : newValue;
      });
      setMacros(prevState => ({
        ...prevState,
        carbohydrates: prevState.carbohydrates + value < 0 ? 0 : prevState.carbohydrates + value,
      }));
    } else if (macro === 'proteins') {
      setAdditionalProteins(prev => {
        const newValue = prev + value;
        return newValue < 0 ? 0 : newValue;
      });
      setMacros(prevState => ({
        ...prevState,
        proteins: prevState.proteins + value < 0 ? 0 : prevState.proteins + value,
      }));
    }
  };

  const calculatePrice = () => {
    return (macros.carbohydrates * parseFloat(foodItem.carbsPrice.$numberDecimal)) +
           (macros.proteins * parseFloat(foodItem.proteinsPrice.$numberDecimal));
  };

  const calculateCalories = () => {
    return (macros.carbohydrates * 4) + (macros.proteins * 4) + (macros.fats * 9);
  };

  const getMacroStyle = (macroValue, defaultValue) => {
    if (macroValue > defaultValue) return { color: 'red' };
    if (macroValue < defaultValue) return { color: 'blue' };
    return { color: 'black' };
  };

  return (
    <div className="food-item">
      <div className="food-details">
        <img src={foodItem.itemPicture.data} alt="Food" className="restaurant-food-image" />
        <div className="food-texts-details">
          <h2 className="food-title">{foodItem.itemName}</h2>
          <div className="food-price-row">
            <span className="food-price-text">Current Price:</span>
            <p className="food-price">${calculatePrice().toFixed(2)}</p>
          </div>
          <div className="food-calories-row">
            <span className="food-calories-text">Calories:</span>
            <p className="food-calories">{calculateCalories()}</p>
          </div>
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
          </div>
          <div className="macro-value-column">
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.carbohydrates, 15)}>
                {macros.carbohydrates}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.proteins, 15)}>
                {macros.proteins}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.fats, parseFloat(foodItem.baseFat.$numberDecimal))}>
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
