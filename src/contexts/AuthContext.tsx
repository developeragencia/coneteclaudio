import React, { createContext, useCallback, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { getAvailablePermissions } from '@/lib/permissions';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
  navigate?: (path: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  navigate?: (path: string) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, navigate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Carrega os dados do usuário do localStorage
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedUser = localStorage.getItem('@SecureBridgeConnect:user');
        const storedToken = localStorage.getItem('@SecureBridgeConnect:token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          parsedUser.permissions = getAvailablePermissions(parsedUser.role);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Erro ao carregar dados armazenados:', error);
        localStorage.removeItem('@SecureBridgeConnect:user');
        localStorage.removeItem('@SecureBridgeConnect:token');
      }
    };

    loadStoredData();
  }, []);

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock de usuário para desenvolvimento
      const mockUser = {
        id: '1',
        name: 'Admin',
        email: credentials.email,
        role: 'admin',
        permissions: ['admin'],
        avatar: null
      };

      localStorage.setItem('@SecureBridgeConnect:user', JSON.stringify(mockUser));
      localStorage.setItem('@SecureBridgeConnect:token', 'mock-token');

      setUser(mockUser);
      
      if (navigate) {
        navigate('/admin');
      }

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const signOut = useCallback(() => {
    setIsLoading(true);
    try {
      localStorage.removeItem('@SecureBridgeConnect:user');
      localStorage.removeItem('@SecureBridgeConnect:token');
      setUser(null);
      
      if (navigate) {
        navigate('/login');
      }

      toast({
        title: "Logout realizado com sucesso",
        description: "Até logo!",
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const updateUser = useCallback((userData: User) => {
    try {
      userData.permissions = getAvailablePermissions(userData.role);
      localStorage.setItem('@SecureBridgeConnect:user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        updateUser,
        navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
