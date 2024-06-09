import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';
import '../assets/styles/OrderPreview.css';

const OrderPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [pickupTime, setPickupTime] = useState({ hour: '', minute: '00', period: 'AM' });
  const [warningMessage, setWarningMessage] = useState('');
  const { cartItems, clearCart, removeItemFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      const currentTime = new Date();
      currentTime.setMinutes(currentTime.getMinutes() + 30);

      const defaultHour = currentTime.getHours() % 12 || 12;
      const defaultMinute = currentTime.getMinutes() >= 45 ? '45' : currentTime.getMinutes() >= 30 ? '30' : currentTime.getMinutes() >= 15 ? '15' : '00';
      const defaultPeriod = currentTime.getHours() >= 12 ? 'PM' : 'AM';

      setPickupTime({
        hour: defaultHour.toString().padStart(2, '0'),
        minute: defaultMinute,
        period: defaultPeriod,
      });
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      console.error('No items in the cart.');
      return;
    }

    const orderItem = cartItems[0];
    const formattedNotes = `Additional notes from customer: ${notes}, Desired pickup time: ${pickupTime.hour}:${pickupTime.minute} ${pickupTime.period}`;

    const orderData = {
      customerName: 'anonymous',
      time: new Date(),
      amount: parseFloat(orderItem.price.toFixed(2)), // Ensure amount is correctly parsed as a number
      paymentType: 'In Person',
      status: 'In Progress',
      details: formattedNotes,
      ownerId: orderItem.ownerId,
      mealName: orderItem.foodItem,
      carbs: orderItem.carbohydrates,
      proteins: orderItem.proteins,
      fats: orderItem.fats,
    };

    console.log('Creating an order with:', JSON.stringify(orderData, null, 2));

    try {
      await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const validatePickupTime = (hour, minute, period) => {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 30);
    const selectedTime = new Date();
    selectedTime.setHours(period === 'AM' ? parseInt(hour, 10) % 12 : (parseInt(hour, 10) % 12) + 12);
    selectedTime.setMinutes(parseInt(minute, 10));

    if (selectedTime < currentTime) {
      setWarningMessage('⚠️ Please choose a pickup time at least 30 minutes from now! 🕒');
    } else {
      setWarningMessage('');
    }
  };

  const handleTimeChange = (type, value) => {
    const newPickupTime = { ...pickupTime, [type]: value };
    setPickupTime(newPickupTime);
    validatePickupTime(newPickupTime.hour, newPickupTime.minute, newPickupTime.period);
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
              <span className="remove-button" onClick={() => removeItemFromCart(index)}>Remove</span>
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
            className="notes-input"
            placeholder="Enter additional notes"
          />
        </div>
        {cartItems.length > 0 && (
          <>
            <div className="thin-line"></div>
            {warningMessage && <div className="warning-message">{warningMessage}</div>}
            <div className="pickup-time">
              <label htmlFor="pickup-time-hour">Pickup Time:</label>
              <div className="time-inputs">
                <input
                  type="number"
                  id="pickup-time-hour"
                  value={pickupTime.hour}
                  onChange={(e) => handleTimeChange('hour', e.target.value.padStart(2, '0'))}
                  className="time-input"
                  placeholder="HH"
                  min="1"
                  max="12"
                />
                :
                <select
                  id="pickup-time-minute"
                  value={pickupTime.minute}
                  onChange={(e) => handleTimeChange('minute', e.target.value)}
                  className="time-input"
                >
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <select
                  value={pickupTime.period}
                  onChange={(e) => handleTimeChange('period', e.target.value)}
                  className="time-period-select"
                >
                  {new Date().getHours() >= 12 ? <option value="PM">PM</option> : (
                    <>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </>
        )}
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
