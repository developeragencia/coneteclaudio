import { Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes } from './AdminRoutes';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { LoginPage } from '@/pages/Login';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {adminRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
} 