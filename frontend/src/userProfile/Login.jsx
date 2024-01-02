// Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'https://gm-backend-qfd5.onrender.com/auth';
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setErrorMessage('');

        // Set the user in the authentication context upon successful login
        login(data); // Adjust this based on your actual user data structure

        // Redirect to another page upon successful login
        history.push('/'); // Change '/dashboard' to your desired route
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.errorMessage || 'Error logging in');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <div className="userProfile">
        <div className="big-container">
          <form onSubmit={handleSubmit}>
            <h2>Log In </h2>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Continue</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='sign-up'>
              <p>Do not have an account?</p>
              <h3>
                <Link to="/userProfile">Sign Up Here</Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
