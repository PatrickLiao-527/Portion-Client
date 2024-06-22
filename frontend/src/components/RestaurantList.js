import React, { useEffect } from 'react';
import '../assets/styles/RestaurantList.css';
import sampleRestaurantImage from '../assets/images/CAVA-food.png';

const BASE_URL = 'http://localhost:5555/uploads/';

const RestaurantList = ({ restaurants, onRestaurantClick }) => {
  useEffect(() => {
    restaurants.forEach((restaurant, index) => {
      console.log(`Restaurant ${index + 1}:`);
      console.log(`Name: ${restaurant.name}`);
      console.log(`Image Path: ${restaurant.img ? `${BASE_URL}${restaurant.img}` : 'No image available'}`);
    });
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
          <img
            src={restaurant.img ? `${BASE_URL}${restaurant.img}` : sampleRestaurantImage}
            alt={restaurant.name}
            className="restaurant-image"
            onError={(e) => {
              console.error(`Image load error: ${restaurant.img}`);
              e.target.src = sampleRestaurantImage;
            }}
          />
          <div className="restaurant-details">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-type">{restaurant.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
