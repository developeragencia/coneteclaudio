import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  avatar?: string;
}

interface AppState {
  // Estado de autenticação
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Estado da UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Estado de loading global
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Estado de notificações
  notifications: number;
  setNotifications: (count: number) => void;
  incrementNotifications: () => void;
  clearNotifications: () => void;

  // Estado de tema
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (dark: boolean) => void;

  // Estado de configurações
  settings: {
    language: string;
    timezone: string;
    dateFormat: string;
    numberFormat: string;
  };
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      // Estado inicial de autenticação
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Estado inicial da UI
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Estado inicial de loading
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      // Estado inicial de notificações
      notifications: 0,
      setNotifications: (count) => set({ notifications: count }),
      incrementNotifications: () => set((state) => ({ notifications: state.notifications + 1 })),
      clearNotifications: () => set({ notifications: 0 }),

      // Estado inicial de tema
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (dark) => set({ isDarkMode: dark }),

      // Estado inicial de configurações
      settings: {
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        dateFormat: 'dd/MM/yyyy',
        numberFormat: 'pt-BR',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
    }),
    {
      name: '@SecureBridge:state',
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

// Hooks auxiliares para partes específicas do estado
export const useAuth = () => {
  const { isAuthenticated, user, setUser, logout } = useAppState();
  return { isAuthenticated, user, setUser, logout };
};

export const useUI = () => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen, isLoading, setLoading } = useAppState();
  return { sidebarOpen, toggleSidebar, setSidebarOpen, isLoading, setLoading };
};

export const useNotifications = () => {
  const { notifications, setNotifications, incrementNotifications, clearNotifications } = useAppState();
  return { notifications, setNotifications, incrementNotifications, clearNotifications };
};

export const useTheme = () => {
  const { isDarkMode, toggleTheme, setDarkMode } = useAppState();
  return { isDarkMode, toggleTheme, setDarkMode };
};

export const useSettings = () => {
  const { settings, updateSettings } = useAppState();
  return { settings, updateSettings };
}; 