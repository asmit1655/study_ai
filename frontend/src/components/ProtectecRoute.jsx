import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const ProtectedRoute = () => {
    const { token } = useAuth();

    if (token) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;