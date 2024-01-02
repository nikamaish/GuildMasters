// Logout.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const apiUrl = 'http://localhost:5000/auth';
        const response = await fetch(`${apiUrl}/logout`, {
          method: 'GET',
          credentials: 'include', // Include credentials for sessions/cookies
        });

        if (response.ok) {
          // Successful logout on the backend, now perform the logout on the frontend
          logout();
          
        } else {
          // Handle logout failure
          console.error('Logout failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    // Call the logout function when the component mounts
    handleLogout();
  }, [logout]);

  return (
    <div>
      {/* <h2>Logging out...</h2> */}
      {/* <h2>LogOut</h2> */}
      {/* You can add a loading spinner or any other visual indication here */}
    </div>
  );
};

export default Logout;
