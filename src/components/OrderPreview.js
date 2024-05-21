// src/components/OrderPreview.js
import React, { useState } from 'react';
import '../assets/styles/OrderPreview.css';

const OrderPreview = ({ orderTitle, carbohydrates, carbohydratesCost, proteins, proteinsCost, fats, fatsCost, additionalNotes, subTotal, deliveryFees, serviceFees, taxes, total }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(additionalNotes);
  const [carbValue, setCarbValue] = useState(carbohydrates);
  const [proteinValue, setProteinValue] = useState(proteins);
  const [fatValue, setFatValue] = useState(fats);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleValueChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div className="order-preview">
      <div className="order-preview-header">
        <h1>{orderTitle}</h1>
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
      </div>
      <div className="macro-nutrients">
        <div className="nutrient">
          <span>Carbohydrates</span>
          <span className="value">
            {isEditing ? <input type="number" value={carbValue} onChange={(e) => handleValueChange(e, setCarbValue)} onKeyPress={handleKeyPress} className="editable-input carb-value" /> : <span className="value-text carb-value">{carbValue}g</span>}
            <span className="cost">${carbohydratesCost}</span>
          </span>
        </div>
        <div className="nutrient">
          <span>Proteins</span>
          <span className="value">
            {isEditing ? <input type="number" value={proteinValue} onChange={(e) => handleValueChange(e, setProteinValue)} onKeyPress={handleKeyPress} className="editable-input protein-value" /> : <span className="value-text protein-value">{proteinValue}g</span>}
            <span className="cost">${proteinsCost}</span>
          </span>
        </div>
        <div className="nutrient">
          <span>Fats</span>
          <span className="value">
            {isEditing ? <input type="number" value={fatValue} onChange={(e) => handleValueChange(e, setFatValue)} onKeyPress={handleKeyPress} className="editable-input fat-value" /> : <span className="value-text fat-value">{fatValue}g</span>}
            <span className="cost">${fatsCost}</span>
          </span>
        </div>
      </div>
      <div className="additional-notes">
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="editable-input notes-input" placeholder="Enter additional notes" />
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
};

export default OrderPreview;
