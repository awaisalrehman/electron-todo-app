import TodoList from "@renderer/pages/TodoList";
import Register from "@renderer/pages/Register";
import Login from "@renderer/pages/Login";

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
