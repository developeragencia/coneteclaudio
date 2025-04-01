import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Primeiro verifica o localStorage
        const storedUser = localStorage.getItem('@SecureBridgeConnect:user');
        const storedToken = localStorage.getItem('@SecureBridgeConnect:token');

        if (storedUser && storedToken) {
          if (mounted) {
            context.updateUser(JSON.parse(storedUser));
            setIsLoading(false);
          }
          return;
        }

        // Se não houver dados no localStorage, redireciona para login
        if (mounted) {
          setIsLoading(false);
          if (window.location.pathname !== '/login') {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        if (mounted) {
          setIsLoading(false);
          if (window.location.pathname !== '/login') {
            navigate('/login');
          }
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [context, navigate]);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  // Adiciona um método auxiliar para verificar permissões (usado no ProtectedRoute)
  const checkPermission = (permission: string) => {
    return context.user?.permissions?.includes(permission) || false;
  };

  return { 
    ...context,
    isAuthenticated: !!context.user,
    isLoading,
    checkPermission
  };
}
