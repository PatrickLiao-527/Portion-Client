// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignUpModal from './components/SignUpWithEmail';
import OrderPage from './components/OrderPage';
import HomePage from './components/HomePage';
import ContactUsPage from './components/ContactUs';
import LoginModal from './components/LoginModal';
import OrderConfirmation from './components/OrderConfirmation';
import OrderStatus from './components/OrderStatus';
import { Helmet } from "react-helmet"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEmailModal = () => {
    setIsModalOpen(false); // Close the initial signup modal
    setIsEmailModalOpen(true);
  };
  const closeEmailModal = () => setIsEmailModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => {
    setIsLoginModalOpen(false); // Close the login modal
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
      <Helmet>
        <title>Portion</title>
      </Helmet>
        <Header onSignUpClick={openModal} onLoginClick={openLoginModal} />
        {isModalOpen && (
          <SignUpModal
            onClose={closeModal}
            onEmailClick={openEmailModal}
            onLoginClick={openLoginModal}
          />
        )}
        {isEmailModalOpen && <SignUpModal onClose={closeEmailModal} onLoginClick={openLoginModal} />}
        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onSignUpClick={openSignUpModal} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} /> 
          <Route path="/order-status" element={<OrderStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
