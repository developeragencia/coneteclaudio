import api from '@/lib/api';
import { User } from '@/types/user';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const authService = {
  async login({ email, password }: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await api.post<RefreshTokenResponse>('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await api.post('/auth/change-password', data);
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      throw error;
    }
  },

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    try {
      await api.post('/auth/forgot-password', data);
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      throw error;
    }
  },

  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      await api.post('/auth/reset-password', data);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      throw error;
    }
  },

  async me(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  },
}; 