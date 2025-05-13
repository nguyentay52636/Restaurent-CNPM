import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import AdminPages from './modules/admin/pages/AdminPages';

import HomePages from '@/modules/home/components/Home/pages/HomePages';
import AuthPages from './modules/auth/pages/AuthPages';
import { RegisterForm } from './modules/auth/components/Register/RegisterForm';
import LoginForm from './modules/auth/components/Login/LoginForm';
import { ForgetPasswordForm } from './modules/auth/components/ForgetPassword/ForgetPasswordForm';
import ComfirmPassword from './modules/auth/components/ForgetPassword/ComfirmPassword';
import { SetNewPasswordForm } from './modules/auth/components/ForgetPassword/SetNewPasswordForm';
import ProductManager from './modules/home/components/ProductTable/pages/ProductManager';
import HomeManager from './modules/admin/components/Home/pages/HomeManager';
import ProductList from './modules/home/components/Product/pages/Product';
import OrderHistoryManager from './modules/admin/components/OrderHistory/OrderHistoryManager';
import NotificationsHistoryOrder from './modules/admin/components/OrderHistory/components/NotificationsHistoryOrder';
import AccountManager from './modules/admin/components/AccountManager/AccountManager';
import ChatManager from './modules/admin/components/Chat/ChatManager';
import OrderManager from './modules/admin/components/Order/OrderManager';
import SetATable from './modules/admin/components/SetATable';
import FeedbackManager from './modules/admin/components/Feedback/FeedbackManager';
import ManagerDashBoard from './modules/admin/components/DashBoard/ManagerDashBoard';
import { Toaster } from '@/components/ui/toaster';
import Product from './modules/home/components/Product/pages/Product';

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
          path :'products',
          element : <Product/>
        }
      ],
    },
    {
      path: 'auth',
      element: <AuthPages />,
      children: [
        {
          path: 'login',
          element: <LoginForm />,
        },
        {
          path: 'register',
          element: <RegisterForm />,
        },
        {
          path: 'forget-password',
          element: <ForgetPasswordForm />,
        },
        {
          path: 'confirm-password',
          element: <ComfirmPassword />,
        },
        {
          path: 'new-password',
          element: <SetNewPasswordForm />,
        },
      ],
    },
    // Admin layout
    {
      path: 'admin',
      element: <AdminPages />,
      children: [
        {
          path: 'home',
          element: <HomeManager />,
        },
        {
          path: 'products',
          element: <ProductManager />,
        },
        {
          path: 'order',
          element: <OrderHistoryManager />,
        },

        {
          path: 'order-history',
          element: < OrderManager />,
        },
        {
          path: 'notifications',
          element: <NotificationsHistoryOrder />,
        },
        {
          path: 'accounts',
          element: <AccountManager />,
        },
        {
          path: 'chats',
          element: <ChatManager />,
        },
        {
          path: 'settable',
          element: <SetATable />,
        },
        {
          path: 'feedback',
          element: <FeedbackManager />,
        },
        {
          path: 'dashboard',
          element: <ManagerDashBoard />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
