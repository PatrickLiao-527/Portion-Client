// src/components/RestaurantList.js
import React from 'react';
import '../assets/styles/RestaurantList.css';
import sampleRestaurantImage from '../assets/images/CAVA-food.png'; // Correct image path

const RestaurantList = ({ restaurants, onRestaurantClick }) => {
  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant, index) => (
        <div
          key={index}
          className="restaurant-item"
          onClick={() => onRestaurantClick(restaurant)}
        >
          <img src={sampleRestaurantImage} alt={restaurant.name} className="restaurant-image" />
          <div className="restaurant-details">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-type">{restaurant.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
