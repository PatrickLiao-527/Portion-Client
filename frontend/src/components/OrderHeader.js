import React from 'react';
import '../assets/styles/OrderHeader.css'; 

const OrderHeader = () => {
  return (
    <div className="order-header-wrapper">
      <h1 className="order-header-title">Customize your meals with our partner restaurants</h1>
      <p className="order-header-subtitle">Become a member to save 15% on all orders.</p>
    </div>
  );
};

export default OrderHeader;
