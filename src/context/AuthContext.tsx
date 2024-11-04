import * as React from 'react';
import { createContext, useState, useContext } from 'react';
import { ApplicationSettings } from '@nativescript/core';

interface AuthState {
  isAuthenticated: boolean;
  publicKey: string | null;
  username: string | null;
}

interface AuthContextType extends AuthState {
  login: (username: string, publicKey: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    publicKey: null,
    username: null,
  });

  const login = (username: string, publicKey: string) => {
    setState({
      isAuthenticated: true,
      username,
      publicKey,
    });
    ApplicationSettings.setString('user_public_key', publicKey);
    ApplicationSettings.setString('username', username);
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      publicKey: null,
      username: null,
    });
    ApplicationSettings.remove('user_public_key');
    ApplicationSettings.remove('username');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};