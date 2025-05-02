import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import "./signup.css"; 

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    username: "",
    password: "",
    role: "admin-head", // default value
  });
  
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // Hook to navigate to another page

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to the backend to register the user
      const response = await axios.post('http://localhost:5000/signup', formData);

      // If registration is successful, display success message and navigate to login
      setSuccessMessage('Registration successful! Redirecting to login...');
      setErrorMessage('');
      
      setTimeout(() => {
        navigate("/login"); // Redirect after 3 seconds
      }, 3);
    } catch (error) {
      // Display error message if registration fails
      setSuccessMessage('');
      setErrorMessage('Error registering user. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>

      {/* Display success or error message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* First Name Field */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Middle Name Field */}
        <div className="form-group">
          <label htmlFor="middleName">Middle Name (Optional)</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="admin-head">Admin - Head</option>
            <option value="admin-sales">Admin - Sales</option>
            <option value="admin-inventory">Admin - Inventory</option>
            <option value="owner">Owner</option>
            <option value="pump-attendant">Pump Attendant</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
