// src/services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5555';

// Predefined credentials for public access
const PUBLIC_USER_EMAIL = 'john.doe@examioijojiopjfewle.fdscom';
const PUBLIC_USER_PASSWORD = 'password123';

const authenticateUser = async () => {
  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: PUBLIC_USER_EMAIL,
      password: PUBLIC_USER_PASSWORD
    }, { withCredentials: true });
    console.log('Authenticated with public credentials');
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

const ensureAuthenticated = async () => {
  // Check if the token cookie is already set (this part is a bit tricky with HTTP-only cookies)
  // Since we cannot check HTTP-only cookies directly from JavaScript, we assume the need to authenticate.
  await authenticateUser();
};

export const fetchRestaurants = async () => {
  try {
    await ensureAuthenticated(); // Ensure the user is authenticated
    const response = await fetch(`${BASE_URL}/restaurants`, {
      method: 'GET',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const fetchRestaurantById = async (restaurantId) => {
  try {
    await ensureAuthenticated(); // Ensure the user is authenticated
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'GET',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    throw error;
  }
};

export const fetchMenuItems = async () => {
  try {
    await ensureAuthenticated(); // Ensure the user is authenticated
    const response = await fetch(`${BASE_URL}/menus`, {
      method: 'GET',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    await ensureAuthenticated(); // Ensure the user is authenticated
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
