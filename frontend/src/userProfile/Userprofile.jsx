import React, { useState } from 'react';
import './userprofile.css'; 
import { Link } from 'react-router-dom';

const Userprofile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== passwordVerify) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      const response = await fetch('https://gm-backend-qfd5.onrender.com/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies)
        body: JSON.stringify({ email, password, passwordVerify }),
      });

      if (response.ok) {
        try {
          const data = await response.json();
          setSuccessMessage(data.message || 'User profile created successfully!');
          setErrorMessage('');
          window.location.reload();
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setErrorMessage('Invalid JSON response from the server.');
          setSuccessMessage('');
        }
      } else {
        const data = await response.text(); // Get the response as text
        setErrorMessage(data || 'Error in creating user profile');
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
            <h2>Sign Up </h2>
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
            <input
              type="password"
              placeholder="Verify Password"
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
            />
            <button type="submit">Continue</button>
            <p>By continuing, you agree to our User Agreement and Privacy Policy.</p>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>Already have an account?</p>
            <h3><Link to='/login'>Log In Here</Link></h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
