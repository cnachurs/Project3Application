import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from './firebase'; // Import your logout function

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!loading && user) {
      // Assuming user data is stored with the name property
      setUserName(user.displayName); // Set the user's name if available
    }
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error(error);
      // Instead of preventing the user from logging back in, simply redirect to the login page
      navigate('/login'); // Redirect to login even if logout encounters an error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      {user ? (
        <div>
          <h2>Start Clicking!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          {/* Redirect to login if not logged in */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
