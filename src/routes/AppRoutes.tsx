import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { LoadingFallback } from "@/components/ui/LoadingFallback";

// Lazy loading dos componentes
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const AdminDashboard = lazy(() => import("@/components/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("@/components/admin/AdminUsers"));
const ClientsPanel = lazy(() => import("@/components/admin/clients/ClientsPanel").then(m => ({ default: m.ClientsPanel })));
const SuppliersPanel = lazy(() => import("@/components/admin/suppliers/SuppliersPanel").then(m => ({ default: m.SuppliersPanel })));

export function AppRoutes() {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) return "dashboard";
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/clients")) return "clients";
    if (path.includes("/admin/suppliers")) return "suppliers";
    return "dashboard";
  };

  return (
    <Routes>
      {/* Rota pública - Home */}
      <Route path="/" element={
        <Suspense fallback={<LoadingFallback />}>
          <Home />
        </Suspense>
      } />

      {/* Rota pública - Login */}
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 