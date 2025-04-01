import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppState } from '../useAppState';

describe('useAppState', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppState());
    act(() => {
      result.current.resetState();
    });
  });

  describe('Autenticação', () => {
    it('deve gerenciar estado de autenticação', () => {
      const { result } = renderHook(() => useAppState());
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      };

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.clearUser();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('deve atualizar token de acesso', () => {
      const { result } = renderHook(() => useAppState());
      const mockToken = 'test-token';

      act(() => {
        result.current.setAccessToken(mockToken);
      });

      expect(result.current.accessToken).toBe(mockToken);
    });
  });

  describe('UI State', () => {
    it('deve gerenciar estado de loading', () => {
      const { result } = renderHook(() => useAppState());

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.loading).toBe(true);

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.loading).toBe(false);
    });

    it('deve gerenciar estado de sidebar', () => {
      const { result } = renderHook(() => useAppState());

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(true);

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(false);
    });
  });

  describe('Notificações', () => {
    it('deve adicionar e remover notificações', () => {
      const { result } = renderHook(() => useAppState());
      const mockNotification = {
        id: '1',
        type: 'success',
        message: 'Test notification',
      };

      act(() => {
        result.current.addNotification(mockNotification);
      });

      expect(result.current.notifications).toContainEqual(mockNotification);

      act(() => {
        result.current.removeNotification(mockNotification.id);
      });

      expect(result.current.notifications).not.toContainEqual(mockNotification);
    });

    it('deve limpar todas as notificações', () => {
      const { result } = renderHook(() => useAppState());
      const notifications = [
        { id: '1', type: 'success', message: 'Test 1' },
        { id: '2', type: 'error', message: 'Test 2' },
      ];

      act(() => {
        notifications.forEach(n => result.current.addNotification(n));
      });

      expect(result.current.notifications).toHaveLength(2);

      act(() => {
        result.current.clearNotifications();
      });

      expect(result.current.notifications).toHaveLength(0);
    });
  });

  describe('Tema', () => {
    it('deve alternar entre temas claro e escuro', () => {
      const { result } = renderHook(() => useAppState());

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('deve definir tema específico', () => {
      const { result } = renderHook(() => useAppState());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });
  });

  describe('Configurações', () => {
    it('deve atualizar configurações', () => {
      const { result } = renderHook(() => useAppState());
      const mockSettings = {
        language: 'pt-BR',
        notifications: {
          email: true,
          push: false,
        },
      };

      act(() => {
        result.current.updateSettings(mockSettings);
      });

      expect(result.current.settings).toEqual(mockSettings);
    });

    it('deve mesclar configurações existentes', () => {
      const { result } = renderHook(() => useAppState());
      const initialSettings = {
        language: 'en',
        notifications: {
          email: false,
          push: false,
        },
      };

      act(() => {
        result.current.updateSettings(initialSettings);
      });

      const updateSettings = {
        notifications: {
          email: true,
        },
      };

      act(() => {
        result.current.updateSettings(updateSettings);
      });

      expect(result.current.settings).toEqual({
        language: 'en',
        notifications: {
          email: true,
          push: false,
        },
      });
    });
  });
}); 