import React, { useState, useEffect } from 'react';
import '../assets/styles/OrderPage.css';
import OrderHeader from './OrderHeader';
import OrderPreview from './OrderPreview';
import SearchBar from './SearchBar';
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

  useEffect(() => {
    // Fetch categories and set default selected category to 'All'
    fetchCategories()
      .then((data) => {
        const allCategories = [{ _id: 'all', name: 'All' }, ...data];
        setCategories(allCategories);
        setSelectedCategory(allCategories[0]); // Set default selected category
        //console.log('Fetched categories:', allCategories);
      })
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch restaurants and initialize filteredRestaurants with all restaurants
    fetchRestaurants()
      .then((data) => {
        setRestaurants(data);
        setFilteredRestaurants(data); // Initialize with all restaurants
        //console.log('Fetched restaurants:', data);
        //data.forEach((restaurant) => console.log('Restaurant category:', restaurant.category));
      })
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  useEffect(() => {
    // Fetch menu items for the selected restaurant
    if (selectedRestaurant) {
      //console.log(`Fetching menu items for restaurant with ownerID: ${selectedRestaurant.ownerId}`);
      fetchMenuItems(selectedRestaurant.ownerId)
        .then((data) => setMenuItems(data.filter(item => item.ownerId === selectedRestaurant.ownerId)))
        .catch((error) => console.error(error));
    }
  }, [selectedRestaurant]);

  useEffect(() => {
    // Filter restaurants based on the selected category
    if (selectedCategory) {
      //console.log('Selected category:', selectedCategory);
      const filtered = selectedCategory._id === 'all'
        ? restaurants
        : restaurants.filter((restaurant) => {
            const restaurantCategory = restaurant.category || ''; // Ensure category is a string
            return restaurantCategory.trim().toLowerCase() === selectedCategory.name.trim().toLowerCase();
          });
      //console.log('Filtered restaurants:', filtered);
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
    //console.log('Category clicked:', category);
    setSelectedCategory(category);
  };

  return (
    <div className="order-page">
      <OrderHeader />
      <div className="order-content">
        {!showOrderConfirmation ? (
          <>
            <OrderPreview // This is just a placeholder 
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
