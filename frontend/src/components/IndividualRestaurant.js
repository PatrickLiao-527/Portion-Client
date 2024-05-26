import React, { useState } from 'react';
import '../assets/styles/IndividualRestaurant.css';
import putInCartIcon from '../assets/images/shopping-cart_icon.png';
import downArrowIcon from '../assets/images/Get-in-cart-down-arrow_icon.png';
import backButtonIcon from '../assets/images/Back_button.png';

const IndividualRestaurant = ({ restaurant, onBackClick, restaurantImage, foodImage }) => {
  return (
    <div className="individual-restaurant-card">
      <div className="individual-restaurant-header" style={{ backgroundImage: `url(${restaurantImage})` }}>
        <div className="gradient-overlay"></div>
        <div className="back-button" onClick={onBackClick}>
          <img src={backButtonIcon} alt="Back" />
        </div>
        <h1 className="restaurant-title">{restaurant.name}</h1>
      </div>
      <div className="individual-restaurant-content">
        {restaurant.foodItems.map((foodItem, index) => (
          <FoodItemCard key={index} foodItem={foodItem} foodImage={foodImage} />
        ))}
      </div>
    </div>
  );
};

const FoodItemCard = ({ foodItem, foodImage }) => {
  const [macros, setMacros] = useState({
    carbohydrates: foodItem.defaultCarbohydrates,
    proteins: foodItem.defaultProteins,
    fats: foodItem.defaultFats,
    additional1: 0,
    additional2: 0,
    additional3: 0,
  });

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
        <img src={foodImage} alt="Food" className="restaurant-food-image" />
        <div className="food-texts-details">
          <h2 className="food-title">{foodItem.name}</h2>
          <p className="food-price">${foodItem.price}</p>
          <p className="food-calories">Calories: {foodItem.calories}</p>
          <p className="food-ingredients">Ingredients: {foodItem.ingredients}</p>
        </div>
      </div>
      <div className="cart-icon-container">
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
                {macros.carbohydrates + macros.additional1}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.proteins, foodItem.defaultProteins)}>
                {macros.proteins + macros.additional2}g
              </span>
            </div>
            <div className="macro-item">
              <span className="macro-value" style={getMacroStyle(macros.fats, foodItem.defaultFats)}>
                {macros.fats + macros.additional3}g
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
