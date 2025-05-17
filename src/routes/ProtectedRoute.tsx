import AdminPages from '@/modules/admin/pages/AdminPages';
import { useAppSelector } from '@/redux/hooks/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({children}:{children?:React.ReactNode}) => {
  const {  isAuthenticated } = useAppSelector(selectAuth);

 

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  return (
    <AdminPages>
      {children || <Outlet />}
    </AdminPages>
  );
};
