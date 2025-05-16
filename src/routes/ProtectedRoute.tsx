import AdminPages from '@/modules/admin/pages/AdminPages';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  if (!userInfo.accessToken) {
    return <Navigate to='/auth/login' replace />;
  }

  return (
    <AdminPages>
      <Outlet />
    </AdminPages>
  );
};
