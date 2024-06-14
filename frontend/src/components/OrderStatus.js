import React, { useState, useEffect, useContext } from 'react';
import { fetchUserOrders } from '../services/api'; 
import { AuthContext } from '../contexts/AuthContext'; 
import { WebSocketContext } from '../contexts/WebSocketContext';
import '../assets/styles/OrderStatus.css';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const { user } = useContext(AuthContext); // Access user context
  const { notifications } = useContext(WebSocketContext); // Access WebSocket notifications

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

  const isOrderRecent = (order) => {
    if (order.status === 'Complete') {
      const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
      return new Date(order.time) > oneHourAgo;
    }
    return true;
  };

  const currentOrders = orders.filter(order => order.status === 'In Progress' || isOrderRecent(order));
  const pastOrders = orders.filter(order => order.status !== 'In Progress' && !isOrderRecent(order));

  return (
    <div className="order-status-container">
      <h1>Order Status</h1>
      <div className="current-orders">
        <h2>Current Orders</h2>
        <div className="order-list">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => {
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
            <p className="no-orders">No current orders found</p>
          )}
        </div>
      </div>
      <div className="past-orders">
        <h2>Past Orders</h2>
        <div className="order-list">
          {pastOrders.length > 0 ? (
            pastOrders.map((order) => {
              const { notes } = parseDetails(order.details);
              const orderDate = new Date(order.time).toLocaleDateString();
              return (
                <div key={order._id} className={`order-status-item ${order.status.toLowerCase().replace(' ', '-')}`}>
                  <div className="order-summary" onClick={() => handleToggleExpand(order._id)}>
                    <div className="food-status">
                      <h3>{order.mealName}</h3>
                      <p className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</p>
                    </div>
                    <div className="details">
                      <p><strong>Order Date:</strong> {orderDate}</p>
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
                      <p><strong>Order Time:</strong> {orderDate}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="no-orders">No past orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
