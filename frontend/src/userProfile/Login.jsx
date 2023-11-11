import React, { useState } from 'react';
import './userprofile.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/userprofile/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful response
        setSuccessMessage('User logged in successfully!');
        setErrorMessage(''); // Clear any previous error message
      } else {
        // Handle error response
        const data = await response.json();
        setErrorMessage(data.error || 'Error logging in');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
      setSuccessMessage('');
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
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='sign-up'>            
            <p>Do not have an account</p>
            <h3 >
              <Link to="userProfile">Sign Up Here</Link>
            </h3>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
