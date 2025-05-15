import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    user: {
      fullName: string;
      email: string;
      phone: string | null;
      address: string | null;
      roleId: number;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await dispatch(login({ email, password })).unwrap();
        if (response.statusCode === 200) {
          toast.success('Đăng nhập thành công!', {
            description: `Chào mừng ${response.data.user.fullName}`,
          });

          // Redirect based on role
          if (response.data.user.roleId === 1) {
            navigate('/admin/home'); // Admin dashboard
          } else {
            navigate('/'); // User home page
          }
        }
      } catch (err) {
        toast.error('Đăng nhập thất bại', {
          description: 'Email hoặc mật khẩu không đúng',
        });
      }
    }
  };

  return (
    <div className='login-form'>
      <h2>Đăng Nhập</h2>
      {error && <div className='error'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Nhập email của bạn'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mật khẩu</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Nhập mật khẩu của bạn'
            required
          />
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
