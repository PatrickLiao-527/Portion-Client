import React, { useState, useEffect, useContext } from 'react';
import { fetchUserOrders } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { WebSocketContext } from '../contexts/WebSocketContext';
import '../assets/styles/OrderStatus.css';

const OrderStatus = ({ displayCount, showTitle = true, showAllOrders = false }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const { user } = useContext(AuthContext);
  const { notifications } = useContext(WebSocketContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user.email) {
          const userOrders = await fetchUserOrders(user.email);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      if (latestNotification.type === 'ORDER_STATUS_UPDATED') {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === latestNotification.order._id ? latestNotification.order : order
          )
        );
      }
    }
  }, [notifications]);

  const handleToggleExpand = (id) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const parseDetails = (details) => {
    const notesMatch = details.match(/Additional notes from customer: (.*), Desired pickup time:/);
    const pickupTimeMatch = details.match(/Desired pickup time: (.*)/);

    const notes = notesMatch ? notesMatch[1] : '';
    const pickupTime = pickupTimeMatch ? pickupTimeMatch[1] : '';

    return { notes, pickupTime };
  };

  const sortedOrders = orders.sort((a, b) => new Date(b.time) - new Date(a.time));
  const currentOrders = sortedOrders.filter(order => order.status === 'In Progress' || new Date(order.time) > new Date(new Date().getTime() - 60 * 60 * 1000));
  const ordersToDisplay = showAllOrders ? sortedOrders : currentOrders.slice(0, displayCount);

  return (
    <div className="order-status-container">
      {showTitle && <h2>{showAllOrders ? 'All Orders' : 'Current Orders'}</h2>}
      <div className="order-list">
        {ordersToDisplay.length > 0 ? (
          ordersToDisplay.map((order) => {
            const { notes, pickupTime } = parseDetails(order.details);
            return (
              <div key={order._id} className={`order-status-item ${order.status.toLowerCase().replace(' ', '-')}`}>
                <div className="order-summary" onClick={() => handleToggleExpand(order._id)}>
                  <div className="food-status">
                    <h2>{order.mealName}</h2>
                    <p className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</p>
                  </div>
                  <div className="details">
                    <p><strong>Pickup Time:</strong> {pickupTime}</p>
                    <p><strong>Amount:</strong> ${order.amount.toFixed(2)}</p>
                  </div>
                </div>
                {expandedOrders[order._id] && (
                  <div className="order-details">
                    <p><strong>Notes:</strong> {notes}</p>
                    <p><strong>Carbs:</strong> {order.carbs}g</p>
                    <p><strong>Proteins:</strong> {order.proteins}g</p>
                    <p><strong>Fats:</strong> {order.fats}g</p>
                    <p><strong>Payment Type:</strong> {order.paymentType}</p>
                    <p><strong>Order Time:</strong> {new Date(order.time).toLocaleString()}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-orders">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
