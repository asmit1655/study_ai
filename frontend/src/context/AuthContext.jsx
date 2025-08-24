

import React, { createContext, useState, useContext, useEffect } from 'react';
// 1. Import your API functions
import * as api from '../utils/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        // 2. Use the setAuthToken function from your api.js
        api.setAuthToken(token);
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // 3. The login function now calls the API worker
    const login = async (email, password) => {
        try {
            const data = await api.login({ email, password });
            if (data.access_token) {
                setToken(data.access_token);
            }
        } catch (error) {
            console.error("Login failed in AuthContext:", error);
            throw error;
        }
    };

    // 4. The register function also calls the API worker
    const register = async (email, password) => {
        try {
            await api.register({ email, password });
        } catch (error) {
            console.error("Registration failed in AuthContext:", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);