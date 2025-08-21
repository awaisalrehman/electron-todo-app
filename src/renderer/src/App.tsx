import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TodoList from './pages/TodoList';
import Register from './pages/Register';
import Login from './pages/Login';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          {user ? (
            <Route path="*" element={<TodoList />} />
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;