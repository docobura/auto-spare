import React, { createContext, useState, useContext } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// Provide context values
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user information

    // Mock function to simulate login
    const login = (userData) => setUser(userData);
    // Mock function to simulate logout
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
