import React, { useState } from 'react';
import './userprofile.css';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:5000/auth';  // Specify the API endpoint directly
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

        // Redirect to another page upon successful login
        history.push('/'); // Change '/dashboard' to your desired route

      } else {
        // Handle error response
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
              <p>Do not have an account</p>
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
