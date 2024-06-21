import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/OrderConfirmation.css';
import orderIllustration from '../assets/images/Order-and-CheckOut-image.png';
import { AuthContext } from '../contexts/AuthContext';
import OrderStatus from './OrderStatus';
import { fetchUserOrders, cancelOrder } from '../services/api';
import { WebSocketContext } from '../contexts/WebSocketContext';

const OrderConfirmation = () => {
  const [mostRecentOrder, setMostRecentOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [isCancelled, setIsCancelled] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, socket } = useContext(WebSocketContext);

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

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      if (latestNotification.type === 'ORDER_STATUS_UPDATED') {
        setMostRecentOrder(latestNotification.order);
      }
    }
  }, [notifications]);

  const handleCancelOrder = async () => {
    if (mostRecentOrder) {
      try {
        if (mostRecentOrder.status === 'Complete') {
          console.log('Order is already completed and cannot be cancelled.');
          return;
        }

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
        {isCancelled ? 'Were there any problems during your ordering?' : mostRecentOrder?.status === 'Complete' ? 'Your meal is ready!' : 'The restaurant is preparing your order.'}
      </p>
      {isCancelled && (
        <p className="contact-us-text">
          Please <Link to="/contact-us" className="redirect-link">let us know</Link>.
        </p>
      )}
      {!isCancelled && mostRecentOrder && (
        <OrderStatus displayCount={1} showTitle={false} />
      )}
      {!isCancelled && mostRecentOrder?.status !== 'Complete' && (
        <div className="countdown-timer">
          <p>Time left to cancel your order: {formatTime(timeLeft)}</p>
          <button
            className="cancel-order-button"
            onClick={handleCancelOrder}
            disabled={
              timeLeft === 0 || 
              (mostRecentOrder && mostRecentOrder.status === 'Cancelled')
            }
          >
            Cancel Order
          </button>
        </div>
      )}
      {!isCancelled && (
        <p className="redirect-text">
          View All Orders <Link to="/order-status" className="redirect-link">Here</Link>
        </p>
      )}
    </div>
  );
};

export default OrderConfirmation;
