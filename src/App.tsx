import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Preloader from '@/components/ui/Preloader';
import PrivateRoute from '@/components/auth/PrivateRoute';
import { useAuth } from '@/contexts/AuthContext';

// Lazy loaded components
const Login = React.lazy(() => import('@/pages/Login'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rota raiz */}
      <Route path="/" element={<Login />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
