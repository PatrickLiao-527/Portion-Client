import React, { useState, useEffect } from 'react';
import '../assets/styles/RestaurantList.css';
import sampleRestaurantImage from '../assets/images/CAVA-food.png';
import { fetchRestaurants } from '../services/api';

const RestaurantList = ({ onRestaurantClick }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        console.log('Fetched restaurants:', data); // Log the fetched data
        if (data) {
          setRestaurants(data);
        } else {
          setError('No restaurants found');
        }
      } catch (error) {
        setError('Failed to fetch restaurants');
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
