import React, { useState } from 'react';
import './userprofile.css'; 
import { Link } from 'react-router-dom';

const Userprofile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [successMessage, setSuccessMessage]= useState('');
  const [errorMessage, setErrorMessage]= useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // preventing the default behavior is often done to handle form submissions asynchronously without causing a full page reload. It allows you to perform actions like making an asynchronous request to a server, updating the UI based on the response, and handling errors, all without navigating away from the current page.

    try {
      const response = await fetch('http://localhost:5000/userprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful response (e.g., redirect or show success message)
        // console.log('User profile created successfully!');

        setSuccessMessage('User profile created successfully!');
        setErrorMessage(''); // Clear any previous error message

      } else {
        // Handle error response (e.g., show error message)
        // console.error('Error creating user profile');
        
        const data = await response.json();
        setErrorMessage(data.error || 'Error in creating user profile');
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
            <button type="submit">Continue</button>
            <p>By continuing, you agree to our User Agreement and Privacy Policy.</p>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>Already have a account</p>
            <h3><Link to='login'>Log In Here</Link></h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
