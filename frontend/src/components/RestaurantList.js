import React, {useEffect } from 'react';
import '../assets/styles/RestaurantList.css';
import sampleRestaurantImage from '../assets/images/CAVA-food.png';

const RestaurantList = ({ restaurants, onRestaurantClick }) => {
  useEffect(() => {
  }, [restaurants]);

  if (!restaurants || restaurants.length === 0) {
    return <div>No restaurants available</div>;
  }

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
