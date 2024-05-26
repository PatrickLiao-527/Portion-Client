import React, { useState } from 'react';
import '../assets/styles/OrderPage.css';
import OrderHeader from './OrderHeader';
import OrderPreview from './OrderPreview';
import SearchBar from './SearchBar';
import CategoryScroll from './CategoryScroll';
import RestaurantList from './RestaurantList';
import IndividualRestaurant from './IndividualRestaurant';
import sampleRestaurantImage from '../assets/images/CAVA-food.png'; // Replace with the actual image path
import sampleFoodImage from '../assets/images/Sample-food-image.png'; // Replace with the actual image path

const OrderPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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
    { name: 'Super Healthy Restaurant', type: 'Poke Bowl', image: sampleRestaurantImage },
    { name: 'Healthy Eats', type: 'Vegan', image: sampleRestaurantImage },
    { name: 'Sushi Paradise', type: 'Sushi', image: sampleRestaurantImage },
    { name: 'Burger House', type: 'American', image: sampleRestaurantImage }
  ];

  const foodItems = {
    'Super Healthy Restaurant': [
      {
        name: 'Chicken Breast Salad',
        price: 12.00,
        calories: 'xxx',
        ingredients: 'Chicken breast, black beans, [list all]',
        defaultCarbohydrates: 45,
        defaultProteins: 35,
        defaultFats: 60,
        image: sampleFoodImage
      },
      {
        name: 'Quinoa Bowl',
        price: 10.00,
        calories: 'yyy',
        ingredients: 'Quinoa, veggies, [list all]',
        defaultCarbohydrates: 50,
        defaultProteins: 30,
        defaultFats: 20,
        image: sampleFoodImage
      }
    ],
    'Healthy Eats': [
      {
        name: 'Vegan Burger',
        price: 15.00,
        calories: 'zzz',
        ingredients: 'Vegan patty, lettuce, tomato, [list all]',
        defaultCarbohydrates: 40,
        defaultProteins: 25,
        defaultFats: 15,
        image: sampleFoodImage
      },
      {
        name: 'Green Smoothie',
        price: 8.00,
        calories: 'www',
        ingredients: 'Spinach, kale, banana, [list all]',
        defaultCarbohydrates: 35,
        defaultProteins: 20,
        defaultFats: 5,
        image: sampleFoodImage
      }
    ],
    'Sushi Paradise': [
      {
        name: 'Salmon Roll',
        price: 18.00,
        calories: 'vvv',
        ingredients: 'Salmon, rice, seaweed, [list all]',
        defaultCarbohydrates: 55,
        defaultProteins: 40,
        defaultFats: 10,
        image: sampleFoodImage
      },
      {
        name: 'Tuna Sashimi',
        price: 20.00,
        calories: 'uuu',
        ingredients: 'Tuna, soy sauce, [list all]',
        defaultCarbohydrates: 10,
        defaultProteins: 50,
        defaultFats: 15,
        image: sampleFoodImage
      }
    ]
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant({
      ...restaurant,
      foodItems: foodItems[restaurant.name] || []
    });
  };

  const handleBackClick = () => {
    setSelectedRestaurant(null);
  };

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
          {selectedRestaurant ? (
            <IndividualRestaurant 
              restaurant={selectedRestaurant} 
              onBackClick={handleBackClick} 
              restaurantImage={selectedRestaurant.image}
              foodImage={sampleFoodImage}
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
      </div>
    </div>
  );
};

export default OrderPage;
