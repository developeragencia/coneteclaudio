import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { LoadingFallback } from "@/components/ui/LoadingFallback";

// Lazy loading dos componentes com tratamento de erro
const Home = lazy(() => import("@/pages/Home").catch(() => ({ default: () => <Navigate to="/error" /> })));
const Login = lazy(() => import("@/pages/Login").catch(() => ({ default: () => <Navigate to="/error" /> })));
const AdminDashboard = lazy(() => import("@/components/admin/AdminDashboard").catch(() => ({ default: () => <Navigate to="/error" /> })));
const AdminUsers = lazy(() => import("@/components/admin/AdminUsers").catch(() => ({ default: () => <Navigate to="/error" /> })));
const ClientsPanel = lazy(() => import("@/components/admin/clients/ClientsPanel").then(m => ({ default: m.ClientsPanel })).catch(() => ({ default: () => <Navigate to="/error" /> })));
const SuppliersPanel = lazy(() => import("@/components/admin/suppliers/SuppliersPanel").then(m => ({ default: m.SuppliersPanel })).catch(() => ({ default: () => <Navigate to="/error" /> })));

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

      {/* Rota de erro */}
      <Route path="/error" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Erro ao carregar</h1>
            <p className="text-muted-foreground mb-4">Ocorreu um erro ao carregar a página</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      } />

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 