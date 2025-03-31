import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/Login';
import { DashboardPanel } from '@/components/admin/dashboard/DashboardPanel';
import { UsersPanel } from '@/components/admin/users/UsersPanel';
import { ClientsPanel } from '@/components/admin/clients/ClientsPanel';
import { SuppliersPanel } from '@/components/admin/suppliers/SuppliersPanel';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<DashboardPanel />} />
      <Route path="/admin/users" element={<UsersPanel />} />
      <Route path="/admin/clients" element={<ClientsPanel />} />
      <Route path="/admin/suppliers" element={<SuppliersPanel />} />
    </Routes>
  );
} 