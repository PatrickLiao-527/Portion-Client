// src/components/OrderPage.js
import React from 'react';
import '../assets/styles/OrderPage.css';
import OrderHeader from './OrderHeader';
import OrderPreview from './OrderPreview';
import SearchBar from './SearchBar';
import CategoryScroll from './CategoryScroll';
import RestaurantList from './RestaurantList';

const OrderPage = () => {
  // Mock data for demonstration
  const categories = [
    { name: 'All', selected: true },
    { name: 'Poke Bowl', selected: false },
    { name: 'Mediterranean', selected: false },
    { name: 'Protein Salad', selected: false },
    { name: 'Asian', selected: false },
    { name: 'Mexican', selected: false },
    { name: 'Italian', selected: false },
    { name: 'American', selected: false }
  ];

  const restaurants = [
    { name: 'Super Healthy Restaurant', type: 'Poke Bowl' },
    { name: 'Restaurant Name', type: 'Cuisine Type' },
    { name: 'Healthy Eats', type: 'Vegan' },
    { name: 'Sushi Paradise', type: 'Sushi' },
    { name: 'Burger House', type: 'American' },
    { name: 'Super Healthy Restaurant', type: 'Poke Bowl' },
    { name: 'Restaurant Name', type: 'Cuisine Type' },
    { name: 'Healthy Eats', type: 'Vegan' },
    { name: 'Sushi Paradise', type: 'Sushi' },
    { name: 'Burger House', type: 'American' },
    { name: 'Super Healthy Restaurant', type: 'Poke Bowl' },
    { name: 'Restaurant Name', type: 'Cuisine Type' },
    { name: 'Healthy Eats', type: 'Vegan' },
    { name: 'Sushi Paradise', type: 'Sushi' },
    { name: 'Burger House', type: 'American' },
    { name: 'Super Healthy Restaurant', type: 'Poke Bowl' },
    { name: 'Restaurant Name', type: 'Cuisine Type' },
    { name: 'Healthy Eats', type: 'Vegan' },
    { name: 'Sushi Paradise', type: 'Sushi' },
    { name: 'Burger House', type: 'American' },
    { name: 'Pasta Palace', type: 'Italian' }
    
  ];

  return (
    <div className="order-page">
      <OrderHeader />
      <div className="order-content">
        <OrderPreview
          orderTitle="Chicken Breast Salad"
          carbohydrates={45}
          carbohydratesCost={0}
          proteins={50}
          proteinsCost={3.1}
          fats={20}
          fatsCost={-1.25}
          additionalNotes=""
          subTotal={14.53}
          deliveryFees={1.2}
          serviceFees={2.2}
          taxes={3.11}
          total={21.04}
        />
        <div className="right-section">
          <SearchBar />
          <h2 className="category-title">Choose From Popular Categories</h2>
          <CategoryScroll categories={categories} />
          <RestaurantList restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
