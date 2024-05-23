// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import SignUpModal from './components/SignUpModal';
import OrderPage from './components/OrderPage';
import HomePage from './components/HomePage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header onSignUpClick={openModal} />
        {isModalOpen && <SignUpModal onClose={closeModal} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
