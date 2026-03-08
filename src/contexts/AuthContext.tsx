import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile } from '@/lib/types';

interface AuthContextType {
  user: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: false,
  signInWithGoogle: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock user for development
const mockUser: Profile = {
  id: 'u-admin',
  full_name: 'מנהל המערכת',
  email: 'admin@example.com',
  avatar_url: '',
  created_at: '2026-01-01',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);

  const signInWithGoogle = () => {
    // Mock: will be replaced with Supabase Google Auth
    setUser(mockUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.email === 'admin@example.com',
        isLoading: false,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
