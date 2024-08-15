import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; // Adjust path if necessary

const AdminRoute = ({ element, ...rest }) => {
  const { userId, authToken } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAdmin = async () => {
      try {
        console.log('Checking admin status...');
        const response = await fetch(`https://auto-spare.onrender.com/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
  
        if (response.ok) {
          const user = await response.json();
          console.log('User data:', user);
          setIsAdmin(user.role === 'Admin');
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId && authToken) {
      checkAdmin();
    } else {
      setLoading(false);
    }
  }, [userId, authToken]);
  

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
