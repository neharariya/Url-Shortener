import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { logoutUser } from '../api/user.api.js';
import { logout } from '../store/slice/authSlice.js';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        handleLogout();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            // Clear Redux state
            dispatch(logout());
            // Redirect to home page
            setTimeout(()=>{navigate({ to: '/' })}, 2000);
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if API fails, clear local state and redirect
            dispatch(logout());
            navigate({ to: '/' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Logging out...</p>
            </div>
        </div>
    );
};

export default Logout;