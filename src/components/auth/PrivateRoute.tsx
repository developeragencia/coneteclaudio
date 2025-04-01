import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingFallback } from '@/components/ui/LoadingFallback';
import { useEffect, useState } from 'react';

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Se não está mais carregando e está autenticado, remove o loading após um pequeno delay
    if (!isLoading && isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated]);

  // Se está carregando ou ainda precisa mostrar o loading, mostra o loading
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