import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingFallback } from '@/components/ui/LoadingFallback';
import { useEffect, useState } from 'react';

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Mostra o loading por pelo menos 500ms para evitar flash
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Se ainda está carregando ou dentro do tempo mínimo de loading, mostra o loading
  if (isLoading || showLoading) {
    return <LoadingFallback />;
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se está autenticado e não está mais carregando, mostra o conteúdo
  return <Outlet />;
} 