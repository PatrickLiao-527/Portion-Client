import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/OrderConfirmation.css';
import orderIllustration from '../assets/images/Order-and-CheckOut-image.png';
import { AuthContext } from '../contexts/AuthContext';
import OrderStatus from './OrderStatus';
import { fetchUserOrders } from '../services/api';

const OrderConfirmation = () => {
  const [mostRecentOrder, setMostRecentOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMostRecentOrder = async () => {
      try {
        if (user && user.email) {
          const userOrders = await fetchUserOrders(user.email);
          if (userOrders.length > 0) {
            const sortedOrders = userOrders.sort((a, b) => new Date(b.time) - new Date(a.time));
            setMostRecentOrder(sortedOrders[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchMostRecentOrder();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cancelOrder = () => {
    // Implement the cancel order logic here
    console.log('Order cancelled');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="order-confirmation">
      <h1 className="thank-you-text">Thank you for ordering with us!</h1>
      <div className="illustration-container">
        <img src={orderIllustration} alt="Order Illustration" className="order-illustration" />
      </div>
      <p className="preparing-text">The restaurant is preparing your order.</p>
      {mostRecentOrder && (
        <OrderStatus displayCount={1} showTitle={false} />
      )}
      <div className="countdown-timer">
        <p>Time left to cancel your order: {formatTime(timeLeft)}</p>
        <button
          className="cancel-order-button"
          onClick={cancelOrder}
          disabled={timeLeft === 0}
        >
          Cancel Order
        </button>
      </div>
      <p className="redirect-text">
        You can <Link to="/order-status" className="redirect-link">check the status of your order here</Link>
      </p>
    </div>
  );
};

export default OrderConfirmation;
