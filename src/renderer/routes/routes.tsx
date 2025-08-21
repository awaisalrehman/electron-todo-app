import TodoList from "../pages/TodoList";
import Register from "../pages/Register";
import Login from "../pages/Login";

// Authenticated routes
export const privateRoutes = [
  {
    path: "*",
    element: <TodoList />,
  },
];

// Public routes
export const publicRoutes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Login />,
  },
];
