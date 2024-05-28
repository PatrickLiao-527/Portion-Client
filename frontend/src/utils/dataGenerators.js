// src/utils/dataGenerators.js
import sampleRestaurantImage from '../assets/images/CAVA-food.png'; // Correct image path
import sampleFoodImage from '../assets/images/Sample-food-image.png'; // Replace with actual image path

export const generateCategories = (count) => {
  const categoryNames = ['All', 'Poke Bowl', 'Mediterranean', 'Protein Salad', 'Asian', 'Mexican', 'Italian', 'American'];
  const categories = [];

  for (let i = 0; i < count; i++) {
    categories.push({
      name: categoryNames[i % categoryNames.length],
      selected: i === 0, // Set the first category as selected by default
    });
  }

  return categories;
};

export const generateRestaurants = (count) => {
  const restaurantTypes = ['Poke Bowl', 'Vegan', 'Sushi', 'American'];
  const restaurants = [];

  for (let i = 0; i < count; i++) {
    restaurants.push({
      id: `restaurant${i + 1}`,
      name: `Restaurant ${i + 1}`,
      type: restaurantTypes[i % restaurantTypes.length],
      image: sampleRestaurantImage,
    });
  }

  return restaurants;
};

export const generateMenuItems = (restaurantId, count) => {
  const menuItems = [];

  for (let i = 0; i < count; i++) {
    menuItems.push({
      id: `menuItem${restaurantId}-${i + 1}`,
      name: `Menu Item ${i + 1}`,
      image: sampleFoodImage,
      price: (Math.random() * 20 + 5).toFixed(2),
      calories: Math.floor(Math.random() * 500 + 200),
      ingredients: 'Chicken, Rice, Beans, Lettuce',
      defaultCarbohydrates: Math.floor(Math.random() * 100),
      defaultProteins: Math.floor(Math.random() * 50),
      defaultFats: Math.floor(Math.random() * 30),
    });
  }

  return menuItems;
};
