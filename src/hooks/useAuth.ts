
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  // Adiciona um método auxiliar para verificar permissões (usado no ProtectedRoute)
  const checkPermission = (permission: string) => {
    return context.user?.permissions?.includes(permission) || false;
  };

  const isAuthenticated = !!context.user;

  return { 
    ...context,
    isAuthenticated,
    checkPermission
  };
}
