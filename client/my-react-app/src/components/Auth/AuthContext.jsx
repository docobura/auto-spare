import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (authToken && userId) {
      fetch(`https://auto-spare.onrender.com/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => response.json())
      .then(data => setUserRole(data.role))
      .catch(error => console.error('Error fetching user role:', error));
    }
  }, [authToken, userId]);

  const login = (token, id) => {
    setAuthToken(token);
    setUserId(id);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setAuthToken(null);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ authToken, userId, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
