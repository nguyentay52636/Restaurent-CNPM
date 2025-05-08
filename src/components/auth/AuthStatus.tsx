import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';

const AuthStatus: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="auth-status">
            <p>Logged in as: {user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AuthStatus; 