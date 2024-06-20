import React, { useState, useEffect } from 'react';
import '../assets/styles/OrderPage.css';
import OrderHeader from './OrderHeader';
import OrderPreview from './OrderPreview';
//import SearchBar from './SearchBar';
import CategoryScroll from './CategoryScroll';
import RestaurantList from './RestaurantList';
import IndividualRestaurant from './IndividualRestaurant';
import OrderConfirmation from './OrderConfirmation';
import { fetchMenuItems, fetchCategories, fetchRestaurants } from '../services/api';

const OrderPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOrderPreviewOpen, setIsOrderPreviewOpen] = useState(false);

  useEffect(() => {
    // Fetch categories and set default selected category to 'All'
    fetchCategories()
      .then((data) => {
        const allCategories = [{ _id: 'all', name: 'All' }, ...data];
        setCategories(allCategories);
        setSelectedCategory(allCategories[0]); // Set default selected category
      })
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch restaurants and initialize filteredRestaurants with all restaurants
    fetchRestaurants()
      .then((data) => {
        setRestaurants(data);
        setFilteredRestaurants(data); // Initialize with all restaurants
      })
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  useEffect(() => {
    // Fetch menu items for the selected restaurant
    if (selectedRestaurant) {
      console.log('Selected Restaurant:', selectedRestaurant);
      fetchMenuItems(selectedRestaurant._id)
        .then((data) => setMenuItems(data.filter(item => item.ownerId === selectedRestaurant.ownerId)))
        .catch((error) => console.error(error));
    }
  }, [selectedRestaurant]);

  useEffect(() => {
    // Filter restaurants based on the selected category
    if (selectedCategory) {
      const filtered = selectedCategory._id === 'all'
        ? restaurants
        : restaurants.filter((restaurant) => {
            const restaurantCategory = restaurant.category || ''; // Ensure category is a string
            return restaurantCategory.trim().toLowerCase() === selectedCategory.name.trim().toLowerCase();
          });
      setFilteredRestaurants(filtered);
    }
  }, [selectedCategory, restaurants]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackClick = () => {
    setSelectedRestaurant(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderPreviewClose = () => {
    setIsOrderPreviewOpen(false);
  };

  const handleOrderPreviewOpen = () => {
    setIsOrderPreviewOpen(true);
  };

  const renderContent = () => {
    if (isOrderPreviewOpen) {
      return <OrderPreview onClose={handleOrderPreviewClose} />;
    }

    return selectedRestaurant ? (
      <IndividualRestaurant
        restaurant={selectedRestaurant}
        menuItems={menuItems}
        onBackClick={handleBackClick}
        restaurantId={selectedRestaurant.ownerId} // Pass the correct restaurantId here
      />
    ) : (
      <>
        {/*<SearchBar />*/}
        <h2 className="category-title">Choose From Popular Categories</h2>
        <CategoryScroll
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
        <RestaurantList
          restaurants={filteredRestaurants}
          onRestaurantClick={handleRestaurantClick}
        />
      </>
    );
  };

  return (
    <div className="order-page">
      <OrderHeader onOrderPreviewOpen={handleOrderPreviewOpen} />
      <div className="order-content">
        {!showOrderConfirmation ? (
          <>
            <div className="order-preview">
              <OrderPreview onClose={handleOrderPreviewClose} />
            </div>
            <div className="right-section">
              {renderContent()}
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
