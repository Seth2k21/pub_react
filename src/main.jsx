// import react package's
import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import all page's file
import App from './App.jsx'
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx';
import Store from './pages/Store';
import DetailItem from './pages/DetailItem.jsx';
import ErrorPage from './components/ErrorPage';

// initialisation of query client
const queryClient = new QueryClient();
// configure app routes
const route = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "store",
    element: <Store/>,
  },
  {
    path: "detail/:id",
    element: <DetailItem/>
  },
  {
    path: "*",
    element: <ErrorPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <RouterProvider router={route}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
