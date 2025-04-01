import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = '@SecureBridge:token';
const REFRESH_TOKEN_KEY = '@SecureBridge:refreshToken';

interface JWTPayload {
  sub: string;
  exp: number;
  roles: string[];
  requires2FA: boolean;
  is2FAVerified: boolean;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const isTokenValid = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getTokenPayload = (): JWTPayload | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
};

export const requires2FA = (): boolean => {
  const payload = getTokenPayload();
  return payload?.requires2FA || false;
};

export const is2FAVerified = (): boolean => {
  const payload = getTokenPayload();
  return payload?.is2FAVerified || false;
};

export const hasRole = (role: string): boolean => {
  const payload = getTokenPayload();
  return payload?.roles.includes(role) || false;
};

export const isAuthenticated = (): boolean => {
  const isValid = isTokenValid();
  const needsVerification = requires2FA();
  const isVerified = is2FAVerified();

  return isValid && (!needsVerification || isVerified);
}; 