import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Role } from '../types/index.js';
import { api, setAuthToken, removeAuthToken, getAuthToken } from '../services/api.js';

interface AuthContextType {
  user: User | null;
  profile: any;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role?: Role) => Promise<void>;
  demoLogin: (role: Role) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUserData = async () => {
    try {
      const data = await api.getMe();
      if (data.success && data.user) {
        setUser(data.user);
        setProfile(data.profile);
      }
    } catch (err) {
      console.warn('[Auth] Session expired or unauthenticated:', err);
      // If failed, clear token
      removeAuthToken();
      setToken(null);
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const existingToken = getAuthToken();
    if (existingToken) {
      refreshUserData();
    } else {
      // By default, let user stay unauthenticated for the public home page, or auto-login if demo preference exists
      const savedDemo = localStorage.getItem('ayush_demo_auto');
      if (savedDemo) {
        demoLogin(savedDemo as Role).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const login = async (email: string, password: string, role?: Role) => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password, role });
      if (res.token) {
        setAuthToken(res.token);
        setToken(res.token);
        setUser(res.user);
        await refreshUserData();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (role: Role) => {
    setIsLoading(true);
    try {
      const res = await api.demoLogin(role);
      if (res.token) {
        setAuthToken(res.token);
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('ayush_demo_role', role);
        await refreshUserData();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeAuthToken();
    localStorage.removeItem('ayush_demo_role');
    localStorage.removeItem('ayush_demo_auto');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isLoading,
        login,
        demoLogin,
        logout,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
