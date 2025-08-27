import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData: AuthUser = JSON.parse(savedUser);

          // Verify session
          const response = await window.api.apiRequest<undefined, VerifyResponse>('/api/auth/verify', 'GET');
          if (response.success && response.user) {
            setUser(userData);
          } else {
            localStorage.removeItem('user');
          }
        }
      } catch {
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

      const response = await window.api.apiRequest<LoginInput, LoginResponse>(
        '/api/auth/login',
        'POST',
        credentials
      );

      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: (response as any).error ?? 'Login failed' };
      }
    } catch {
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

      const response = await window.api.apiRequest<RegisterInput, RegisterResponse>(
        '/api/auth/register',
        'POST',
        userData
      );

      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: (response as any).error ?? 'Registration failed' };
      }
    } catch {
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
      await window.api.apiRequest<undefined, { success: true }>('/api/auth/logout', 'POST');
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

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
