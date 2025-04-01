import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { getAvailablePermissions } from '@/lib/permissions';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const navigateInternal = useNavigate();

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedUser = localStorage.getItem('@SecureBridgeConnect:user');
        const storedToken = localStorage.getItem('@SecureBridgeConnect:token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          parsedUser.permissions = getAvailablePermissions(parsedUser.role);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        localStorage.removeItem('@SecureBridgeConnect:user');
        localStorage.removeItem('@SecureBridgeConnect:token');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para teste
      const mockUser = {
        id: '1',
        name: 'Usuário Teste',
        email: credentials.email,
        role: 'admin',
        permissions: getAvailablePermissions('admin')
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('@SecureBridgeConnect:user', JSON.stringify(mockUser));
      localStorage.setItem('@SecureBridgeConnect:token', mockToken);
      
      setUser(mockUser);
      toast.success('Login realizado com sucesso!');
      navigateInternal('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@SecureBridgeConnect:user');
    localStorage.removeItem('@SecureBridgeConnect:token');
    setUser(null);
    navigateInternal('/login');
  };

  const updateUser = (userData: User) => {
    try {
      userData.permissions = getAvailablePermissions(userData.role);
      localStorage.setItem('@SecureBridgeConnect:user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast.error('Erro ao atualizar perfil');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
        updateUser,
        navigate: navigateInternal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
