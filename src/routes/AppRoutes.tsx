import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/Login';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { UsersPage } from '@/pages/admin/Users';
import { ClientsPage } from '@/pages/admin/Clients';
import { SuppliersPage } from '@/pages/admin/Suppliers';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { AdminLayout } from '@/components/layouts/AdminLayout';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas administrativas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/clients" element={<ClientsPage />} />
          <Route path="/admin/suppliers" element={<SuppliersPage />} />
        </Route>
      </Route>

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
} 