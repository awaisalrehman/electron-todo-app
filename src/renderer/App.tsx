import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { privateRoutes, publicRoutes } from "./routes/routes";

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function AppRoutes() {
  const { user } = useAuth();
  return useRoutes(user ? privateRoutes : publicRoutes);
}

const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
