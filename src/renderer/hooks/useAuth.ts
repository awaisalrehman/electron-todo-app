import { useState, useEffect } from 'react';
import { LoginInput, RegisterInput } from '../../shared/schemas/auth';
import { User } from '@prisma/client';

interface AuthResponse {
  success: boolean;
  user?: Pick<User, 'id' | 'email'>;
  error?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          
          // Verify the session is still valid
          const response = await window.api.apiRequest<AuthResponse>('/api/auth/verify', 'GET');
          if (response.success) {
            setUser(userData);
          } else {
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginInput) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await window.api.apiRequest<AuthResponse>('/api/auth/login', 'POST', credentials);
      
      if (response.success && response.user) {
        setUser(response.user as User);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        setError(response.error ?? 'Login failed');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterInput) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await window.api.apiRequest<AuthResponse>('/api/auth/register', 'POST', userData);
      
      if (response.success && response.user) {
        setUser(response.user as User);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        setError(response.error ?? 'Registration failed');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await window.api.apiRequest('/api/auth/logout', 'POST');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };
};
