// src/components/RestaurantList.js
import React from 'react';
import '../assets/styles/RestaurantList.css';
import restaurantImage from '../assets/images/CAVA-food.png';

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="restaurant-list-container">
      {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant-card">
          <img src={restaurantImage} alt={restaurant.name} className="restaurant-image" />
          <div className="restaurant-info">
            <div className="restaurant-name">{restaurant.name}</div>
            <div className="restaurant-type">{restaurant.type}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
