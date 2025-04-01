import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy loaded components
const Login = lazy(() => import('@/pages/Login'));
const AdminDashboard = lazy(() => import('@/components/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/components/admin/AdminUsers'));
const ClientsPanel = lazy(() => import('@/components/admin/clients/ClientsPanel'));
const SuppliersPanel = lazy(() => import('@/components/admin/suppliers/SuppliersPanel'));

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
      <Route path="/login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      } />

      {/* Rotas administrativas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout activeTab={getActiveTab()} />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="/admin/users" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminUsers />
            </Suspense>
          } />
          <Route path="/admin/clients" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ClientsPanel />
            </Suspense>
          } />
          <Route path="/admin/suppliers" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SuppliersPanel />
            </Suspense>
          } />
        </Route>
      </Route>

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
} 