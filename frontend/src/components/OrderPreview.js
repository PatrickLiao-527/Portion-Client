// src/components/OrderPreview.js
import React, { useState } from 'react';
import '../assets/styles/OrderPreview.css';

const OrderPreview = ({ orderTitle, carbohydrates, carbohydratesCost, proteins, proteinsCost, fats, fatsCost, additionalNotes, subTotal, deliveryFees, serviceFees, taxes, total }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(additionalNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderOrderPreview = () => (
    <div className="order-preview">
      <div className="order-preview-header">
        <h1>{orderTitle}</h1>
      </div>
      <div className="macro-nutrients">
        <div className="nutrient-column">
          <span>Carbohydrates</span>
          <span>Proteins</span>
          <span>Fats</span>
        </div>
        <div className="value-column">
          <span>{carbohydrates}g</span>
          <span>{proteins}g</span>
          <span>{fats}g</span>
        </div>
        <div className="adjusted-price-column">
          <span>${carbohydratesCost}</span>
          <span>${proteinsCost}</span>
          <span>${fatsCost}</span>
        </div>
      </div>
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
          <span>Delivery Fees</span>
          <span>${deliveryFees}</span>
        </div>
        <div className="summary-line">
          <span>Service Fees</span>
          <span>${serviceFees}</span>
        </div>
        <div className="summary-line">
          <span>Taxes</span>
          <span>${taxes}</span>
        </div>
      </div>
      <div className="thin-line"></div>
      <div className="total-line">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button className="checkout-button">Order and checkout</button>
    </div>
  );

  return (
    <>
      <div className="order-preview-desktop">
        {renderOrderPreview()}
      </div>
      <div className="order-preview-mobile">
        <button onClick={openModal} className="open-modal-button">View Order</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>&times;</span>
              {renderOrderPreview()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPreview;
