import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/OrderConfirmation.css';
import orderIllustration from '../assets/images/Order-and-CheckOut-image.png';
import { AuthContext } from '../contexts/AuthContext';
import OrderStatus from './OrderStatus';
import { fetchUserOrders, cancelOrder } from '../services/api';
import { WebSocketContext } from '../contexts/WebSocketContext'; // Adjust the import path as needed

const OrderConfirmation = () => {
  const [mostRecentOrder, setMostRecentOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [isCancelled, setIsCancelled] = useState(false);
  const { user } = useContext(AuthContext);
  const { socket } = useContext(WebSocketContext);

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

  const handleCancelOrder = async () => {
    if (mostRecentOrder) {
      try {
        await cancelOrder(mostRecentOrder._id, { status: 'Cancelled', cancelledBy: 'client' });
        setIsCancelled(true);
        setMostRecentOrder((prevOrder) => ({ ...prevOrder, status: 'Cancelled' }));
        console.log('Order cancelled successfully');

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'ORDER_CANCELLED',
            order: mostRecentOrder
          }));
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="order-confirmation">
      <h1 className="thank-you-text">
        {isCancelled ? 'You have successfully cancelled your order' : 'Thank you for ordering with us!'}
      </h1>
      <div className="illustration-container">
        <img src={orderIllustration} alt="Order Illustration" className="order-illustration" />
      </div>
      <p className="preparing-text">
        {isCancelled ? 'Were there any problems during your ordering? Please let us know!' : 'The restaurant is preparing your order.'}
      </p>
      {isCancelled && (
        <p className="contact-us-text">
          Please <Link to="/contact-us" className="redirect-link">let us know</Link>.
        </p>
      )}
      {!isCancelled && mostRecentOrder && (
        <OrderStatus displayCount={1} showTitle={false} />
      )}
      {!isCancelled && (
        <div className="countdown-timer">
          <p>Time left to cancel your order: {formatTime(timeLeft)}</p>
          <button
            className="cancel-order-button"
            onClick={handleCancelOrder}
            disabled={timeLeft === 0 || (mostRecentOrder && mostRecentOrder.status === 'Cancelled')}
          >
            Cancel Order
          </button>
        </div>
      )}
      {!isCancelled && (
        <p className="redirect-text">
          You can <Link to="/order-status" className="redirect-link">check the status of your order here</Link>
        </p>
      )}
    </div>
  );
};

export default OrderConfirmation;
