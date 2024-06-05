// src/components/OrderPreview.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';
import '../assets/styles/OrderPreview.css';

const OrderPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const orderDetails = cartItems.map(item => ({
      foodItem: item.foodItem,
      carbohydrates: item.carbohydrates,
      proteins: item.proteins,
      fats: item.fats, // Include fats field
      price: item.price,
    }));
  
    const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    const totalCalories = cartItems.reduce((acc, item) => acc + item.calories, 0);
    const orderItem = cartItems[0];

    const orderData = {
      ...orderItem, // Spread the orderItem object
      // Adding required fields for the order
      customerName: 'anonymous', // Set customer name as 'anonymous' for now
      time: new Date(), // Set current time as the order time
      amount: parseFloat(orderItem.price.toFixed(2)), // Set the order amount as the price
      paymentType: 'In Person', // Set payment type as 'In Person'
      status: 'In Progress', // Set status as 'In Progress' initially
      mealName: orderItem.foodItem, 
      carbs: orderItem.carbohydrates,
      proteins: orderItem.proteins,
      fats: orderItem.fats
    };
  
    try {
      await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const renderOrderPreview = () => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    const totalCalories = cartItems.reduce((acc, item) => acc + item.calories, 0);

    return (
      <div className="order-preview">
        <h1>Order Preview</h1>
        {cartItems.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-preview-header">
              <h2>{item.foodItem}</h2>
            </div>
            <div className="macro-nutrients">
              <div className="nutrient-column">
                <span>Carbohydrates: {item.carbohydrates}g</span>
                <span>Proteins: {item.proteins}g</span>
                <span>Fats: {item.fats}g</span>
              </div>
              <div className="value-column">
                <span>${(item.carbohydrates * item.carbsPrice).toFixed(2)}</span>
                <span>${(item.proteins * item.proteinsPrice).toFixed(2)}</span>
                <span>${(item.fats * item.fatsPrice).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="additional-notes">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="editable-input notes-input"
            placeholder="Enter additional notes"
          />
        </div>
        <div className="thin-line"></div>
        <div className="order-summary">
          <div className="summary-line">
            <span>Sub Total</span>
            <span>${subTotal}</span>
          </div>
          <div className="summary-line">
            <span>Total Calories</span>
            <span>{totalCalories}</span>
          </div>
        </div>
        <div className="thin-line"></div>
        <div className="total-line">
          <span>Total</span>
          <span>${subTotal}</span>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>Order and checkout</button>
      </div>
    );
  };

  return (
    <>
      <div className="order-preview-desktop">
        {renderOrderPreview()}
      </div>
      <div className="order-preview-mobile">
        <button onClick={() => setIsModalOpen(true)} className="open-modal-button">View Order</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={() => setIsModalOpen(false)}>&times;</span>
              {renderOrderPreview()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPreview;
