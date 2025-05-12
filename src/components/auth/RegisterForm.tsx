import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface RegisterResponse {
  statusCode: number;
  message: string;
  data: {
    fullName: string;
    email: string;
    roleId: number;
    phone: string | null;
    address: string | null;
    id: number;
    points: number;
    createdAt: string;
    updatedAt: string;
  };
}

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setPasswordError('Mật khẩu không khớp');
            return false;
        }
        if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validatePasswords()) return;

        if (email && password && fullName) {
            try {
                const response = await dispatch(register({ 
                    email, 
                    password, 
                    fullName,
                    roleId: 2 // Default role for new users
                })).unwrap();
                
                if (response.statusCode === 200) {
                    toast.success('Đăng ký thành công!', {
                        description: 'Vui lòng đăng nhập để tiếp tục',
                    });
                    navigate('/login');
                }
            } catch (err) {
                toast.error('Đăng ký thất bại', {
                    description: 'Có lỗi xảy ra, vui lòng thử lại',
                });
            }
        }
    };

    return (
        <div className="register-form">
            <h2>Đăng Ký</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nhập họ và tên của bạn"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu của bạn"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu của bạn"
                        required
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm; 