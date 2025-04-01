import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App';
import './styles/index.css';
import { AuthProvider } from './contexts/AuthContext';

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

// Remover preloader
const removePreloader = () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.remove();
  }
};

// Renderizar app
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Remover preloader após o carregamento
window.addEventListener('load', removePreloader);
