import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './login.css'; 
function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      // Sending the login request to the backend
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      // On success, store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Display success message
      setSuccessMessage('Login successful! Redirecting to dashboard...');

      // Clear error message if any
      setErrorMessage('');

      // Redirect the user to the dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1000);
    } catch (error) {
      
      setErrorMessage('Invalid credentials. Please try again.');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Display success or error message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button type="submit" className="login-btn">Login</button>
      </form>

      {/* Link to Create an Account */}
      <div className="signup-link">
        <p><Link to="/signup">Create an account </Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
