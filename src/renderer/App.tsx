import React, { useEffect, useCallback } from "react";
import { HashRouter, useRoutes, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { privateRoutes, publicRoutes } from "./routes/routes";

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
  </div>
);

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    window.electronAPI.onNavigate(handleNavigation);

    return () => {
      window.electronAPI.removeAllListeners('navigate-to');
    };
    
  }, [handleNavigation]);

  return useRoutes(user ? privateRoutes : publicRoutes);
}

const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
