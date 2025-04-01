import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  const checkPermission = (permission: string) => {
    return context.user?.permissions?.includes(permission) || false;
  };

  return { 
    ...context,
    isAuthenticated: !!context.user,
    checkPermission
  };
}
