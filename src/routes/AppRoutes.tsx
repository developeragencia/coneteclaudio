import { Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes } from './AdminRoutes';
import { LoginPage } from '@/pages/Login';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
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