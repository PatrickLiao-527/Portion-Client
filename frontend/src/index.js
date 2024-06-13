import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { AuthProvider } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="534100633345-b2lv3768vkv2rfss2diin5u2ok6i8ola.apps.googleusercontent.com">
      <AuthProvider>
        <CartProvider>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);