import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '@/pages/Login';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import { ClientsPanel } from '@/components/admin/clients/ClientsPanel';
import { SuppliersPanel } from '@/components/admin/suppliers/SuppliersPanel';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import AdminLayout from '@/components/admin/AdminLayout';

export function AppRoutes() {
  const location = useLocation();
  
  // Determine active tab based on route
  const getActiveTab = () => {
    if (location.pathname.includes('/admin/users')) return 'users';
    if (location.pathname.includes('/admin/clients')) return 'clients';
    if (location.pathname.includes('/admin/suppliers')) return 'suppliers';
    return 'dashboard';
  };

  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas administrativas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout activeTab={getActiveTab()} />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/clients" element={<ClientsPanel />} />
          <Route path="/admin/suppliers" element={<SuppliersPanel />} />
        </Route>
      </Route>

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
} 