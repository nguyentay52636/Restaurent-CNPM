import ProfileUser from '@/components/auth/ProfileUser';
import { MainLayout } from '@/components/layouts';
import AccountManager from '@/modules/admin/components/AccountManager/AccountManager';
import ChatManager from '@/modules/admin/components/Chat/ChatManager';
import ManagerDashBoard from '@/modules/admin/components/DashBoard/ManagerDashBoard';
import FeedbackManager from '@/modules/admin/components/Feedback/FeedbackManager';
import HomeManager from '@/modules/admin/components/Home/pages/HomeManager';
import OrderManager from '@/modules/admin/components/Order/OrderManager';
import NotificationsHistoryOrder from '@/modules/admin/components/OrderHistory/components/NotificationsHistoryOrder';
import OrderHistoryManager from '@/modules/admin/components/OrderHistory/OrderHistoryManager';
import RoleManager from '@/modules/admin/components/Role/RoleManager';
import SetATable from '@/modules/admin/components/SetATable';
import ComfirmPassword from '@/modules/auth/components/ForgetPassword/ComfirmPassword';
import { ForgetPasswordForm } from '@/modules/auth/components/ForgetPassword/ForgetPasswordForm';
import { SetNewPasswordForm } from '@/modules/auth/components/ForgetPassword/SetNewPasswordForm';
import LoginForm from '@/modules/auth/components/Login/LoginForm';
import { RegisterForm } from '@/modules/auth/components/Register/RegisterForm';
import AuthPages from '@/modules/auth/pages/AuthPages';
import AboutUsPage from '@/modules/home/components/Contact/AboutUsPage';
import OrderHistory from '@/modules/home/components/Order/OrderHistory';
import BookingPage from '@/modules/home/components/OrderTable/BookingPage';
import Product from '@/modules/home/components/Product/pages/Product';
import ProductManager from '@/redux/home/components/ProductTable/ProductManager';
import HomePages from '@/redux/home/pages/HomePages';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePages />,
      },
      { path: 'products', element: <Product /> },
      { path: 'profile', element: <ProfileUser /> },
      { path: 'order-history', element: <OrderHistory /> },
      { path: 'booking-table', element: <BookingPage /> },
      { path: 'about', element: <AboutUsPage /> },

    ],
  },
  {
    path: 'auth',
    element: <AuthPages />,
    children: [
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: 'forget-password', element: <ForgetPasswordForm /> },
      { path: 'confirm-password', element: <ComfirmPassword /> },
      { path: 'new-password', element: <SetNewPasswordForm /> },

    ],
  },
  {
    path: 'admin',
    element: <ProtectedRoute />,
    children: [
      { path: 'home', element: <HomeManager /> },
      { path: 'products', element: <ProductManager /> },
      { path: 'order', element: <OrderManager /> },
      { path: 'order-history', element: <OrderHistoryManager /> },
      { path: 'notifications', element: <NotificationsHistoryOrder /> },
      { path: 'accounts', element: <AccountManager /> },
      { path: 'chats', element: <ChatManager /> },
      { path: 'settable', element: <SetATable /> },
      { path: 'feedback', element: <FeedbackManager /> },
      { path: 'dashboard', element: <ManagerDashBoard /> },
      { path: 'role', element: <RoleManager /> },
    ],
  }
];

const router = createBrowserRouter(routes);

export default router;
