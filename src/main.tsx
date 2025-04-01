import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './styles/theme';
import './styles/index.css';
import { AuthProvider } from './contexts/AuthContext';

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

// Error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Algo deu errado</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide navigation
function AppWithProviders() {
  const navigate = useNavigate();
  
  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <AuthProvider navigate={navigate}>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithProviders />
    </BrowserRouter>
  </React.StrictMode>
);
