import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import AdminPages from './modules/admin/pages/AdminPages';

import HomePages from '@/modules/home/pages/HomePages';
import AuthPages from './modules/auth/pages/AuthPages';
import { RegisterForm } from './modules/auth/components/Register/RegisterForm';
import LoginForm from './modules/auth/components/Login/LoginForm';
import { ForgetPasswordForm } from './modules/auth/components/ForgetPassword/ForgetPasswordForm';
import ComfirmPassword from './modules/auth/components/ForgetPassword/ComfirmPassword';
import { SetNewPasswordForm } from './modules/auth/components/ForgetPassword/SetNewPasswordForm';
import OrderManager from './modules/admin/components/Order/OrderManager';
import ProductManager from './modules/home/components/ProductTable/ProductManager';

function App() {
  const router = createBrowserRouter([
    // Main layout
    {
      path: '/',
      element: <MainLayout />,
      children: [
        // Home page
        {
          index: true,
          element: <HomePages />,
        },
        {
          path: 'about',
          element: <h1>About</h1>,
        },

      ],
    },
    {
      path: 'auth',
      element: <AuthPages />,
      children: [
        {
          path: 'login',
          element: <LoginForm />
        },
        {
          path: 'register',
          element: <RegisterForm />
        },
        {
          path: 'forget-password',
          element: <ForgetPasswordForm />
        },
        {
          path: 'confirm-password',
          element: <ComfirmPassword />
        },
        {
          path: 'new-password',
          element: <SetNewPasswordForm />
        }
      ]
    },
    // Admin layout
    {
      path: 'admin',
      element: <AdminPages />,
      children: [
        {
          path: 'products',
          element: <ProductManager />
        },
        {
          path: 'order',
          element: <OrderManager />
        },
      ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
