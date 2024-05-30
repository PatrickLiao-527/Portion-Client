import React, { useState, useEffect } from 'react';
import '../assets/styles/OrderPage.css';
import OrderHeader from './OrderHeader';
import OrderPreview from './OrderPreview';
import SearchBar from './SearchBar';
import CategoryScroll from './CategoryScroll';
import RestaurantList from './RestaurantList';
import IndividualRestaurant from './IndividualRestaurant';
import { fetchMenuItems } from '../api_services/api';
import { generateCategories, generateRestaurants } from '../utils/dataGenerators';
import OrderConfirmation from './OrderConfirmation';

const OrderPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const categories = generateCategories(8);
  const restaurants = generateRestaurants(20);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchMenuItems()
        .then((data) => setMenuItems(data.filter(item => item.ownerId === selectedRestaurant.id)))
        .catch((error) => console.error(error));
    }
  }, [selectedRestaurant]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackClick = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="order-page">
      <OrderHeader />
      <div className="order-content">
        {!showOrderConfirmation ? (
          <>
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
              onCheckout={() => setShowOrderConfirmation(true)}
            />
            <div className="right-section">
              {selectedRestaurant ? (
                <IndividualRestaurant
                  restaurant={selectedRestaurant}
                  menuItems={menuItems}
                  onBackClick={handleBackClick}
                />
              ) : (
                <>
                  <SearchBar />
                  <h2 className="category-title">Choose From Popular Categories</h2>
                  <CategoryScroll categories={categories} />
                  <RestaurantList restaurants={restaurants} onRestaurantClick={handleRestaurantClick} />
                </>
              )}
            </div>
          </>
        ) : (
          <OrderConfirmation />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
