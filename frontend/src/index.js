import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import {AuthProvider} from './contexts/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);