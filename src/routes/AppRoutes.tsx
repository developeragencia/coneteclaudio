import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import AdminLayout from '@/components/admin/AdminLayout';

// Lazy loaded components
const Login = lazy(() => import('@/pages/Login'));
const AdminDashboard = lazy(() => import('@/components/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/components/admin/AdminUsers'));
const ClientsPanel = lazy(() => import('@/components/admin/clients/ClientsPanel').then(m => ({ default: m.ClientsPanel })));
const SuppliersPanel = lazy(() => import('@/components/admin/suppliers/SuppliersPanel').then(m => ({ default: m.SuppliersPanel })));

const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

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
        <Suspense fallback={<LoadingFallback />}>
          <Login />
        </Suspense>
      } />

      {/* Rotas administrativas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout activeTab={getActiveTab()} />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="/admin/users" element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminUsers />
            </Suspense>
          } />
          <Route path="/admin/clients" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientsPanel />
            </Suspense>
          } />
          <Route path="/admin/suppliers" element={
            <Suspense fallback={<LoadingFallback />}>
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