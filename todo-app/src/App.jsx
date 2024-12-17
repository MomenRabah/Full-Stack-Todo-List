import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OngoingTasks from './pages/OngoingTasks';
import CompletedTasks from './pages/CompletedTasks';
import Dashboard from './pages/Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
const queryClient = new QueryClient();


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginComponent />
    },
    {
      path: "/register",
      element: <RegisterComponent />
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "tasks/ongoing",
          element: <OngoingTasks />
        },
        {
          path: "tasks/completed",
          element: <CompletedTasks />
        },
        {
          path: "",
          element: <Dashboard />
        },
      ]
    }
  ]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
        </RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App