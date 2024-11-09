import React from 'react'
import Todo from './components/Todo'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OngoingTasks from './pages/OngoingTasks';
import CompletedTasks from './pages/CompletedTasks';
import Dashboard from './pages/Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <HomePage/>,
      children: [
        {
          path:"/tasks/ongoing",
          element: <OngoingTasks />
        },
        {
          path:"/tasks/completed",
          element: <CompletedTasks />
        },
        {
          path:"",
          element: <Dashboard />
        },
      ]
    },
    
  
  ]);

  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
    </RouterProvider>
    </QueryClientProvider>
  )
}

export default App