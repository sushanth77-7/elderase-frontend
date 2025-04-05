import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Credential.css'; // Import CSS file

const Credential = () => {
  const [loginData, setLoginData] = useState({
    phone: '',
    password: '',
    medicalIssue: '', // Optional manual override
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone); // 10-digit phone number validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = {};
    if (!loginData.phone) {
      errors.phone = 'Phone is required.';
    } else if (!validatePhoneNumber(loginData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!loginData.password) {
      errors.password = 'Password is required.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/seniors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: loginData.phone, // Changed to match backend expectations
          password: loginData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      // Store token for future authentication
      localStorage.setItem('token', data.token);

      // Use manually entered medical issue if provided, otherwise use from API
      const medicalIssueToDisplay = loginData.medicalIssue || data.user.currentMedicalIssue;

      // Navigate to user details page with data
      navigate('/user-details', { state: { user: data.user, medicalIssue: medicalIssueToDisplay } });
    } catch (error) {
      setErrors({ server: error.message });
    }
  };

  return (
    <div className="credential-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={loginData.phone}
            onChange={handleChange}
            required
            maxLength="10"
            autoComplete="new-password"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="medicalIssue">Medical Issue (Optional):</label>
          <input
            type="text"
            id="medicalIssue"
            name="medicalIssue"
            value={loginData.medicalIssue}
            onChange={handleChange}
            placeholder="Enter your medical issue (e.g., leg pains)"
          />
        </div>
        {errors.server && <p className="error-message">{errors.server}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Credential;
