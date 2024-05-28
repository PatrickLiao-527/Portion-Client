// src/services/api.js
const BASE_URL = 'http://localhost:5555';

export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/menus`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
  }
};
