import axios from 'axios';
import { getAuthToken } from '@/utils/auth';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login em caso de token expirado
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Tipos base para respostas da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Endpoints base
export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify2FA: '/auth/verify-2fa',
    setup2FA: '/auth/setup-2fa',
  },
  clients: {
    list: '/clients',
    create: '/clients',
    update: (id: string) => `/clients/${id}`,
    delete: (id: string) => `/clients/${id}`,
    details: (id: string) => `/clients/${id}`,
  },
  suppliers: {
    list: '/suppliers',
    create: '/suppliers',
    update: (id: string) => `/suppliers/${id}`,
    delete: (id: string) => `/suppliers/${id}`,
    details: (id: string) => `/suppliers/${id}`,
  },
  payments: {
    list: '/payments',
    create: '/payments',
    update: (id: string) => `/payments/${id}`,
    delete: (id: string) => `/payments/${id}`,
    details: (id: string) => `/payments/${id}`,
    process: (id: string) => `/payments/${id}/process`,
  },
};

export default api; 