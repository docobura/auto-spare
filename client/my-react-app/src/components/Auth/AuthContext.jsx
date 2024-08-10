import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const id = localStorage.getItem('userId');
        if (token) setAuthToken(token);
        if (id) setUserId(id);
    }, []);

    const login = (token, id) => {
        setAuthToken(token);
        setUserId(id);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', id);
    };

    const logout = () => {
        setAuthToken(null);
        setUserId(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ authToken, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
