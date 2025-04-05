import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './test.css';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    relativeEmail: '',
    age:'',
    bloodGroup: '',
    medicalHistory: '',
    currentMedicalIssue: '',
    emergencyContact: '',
    password: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePhoneNumber = (phone) => {
    // Check if the phone number is exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const errors = {};

    // Validate Phone Number
    if (!formData.phone) {
      errors.phone = 'Phone is required.';
    } else if (!validatePhoneNumber(formData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits.';
    }

    // Validate Emergency Contact
    if (!formData.emergencyContact) {
      errors.emergencyContact = 'Emergency contact is required.';
    } else if (!validatePhoneNumber(formData.emergencyContact)) {
      errors.emergencyContact = 'Emergency contact must be exactly 10 digits.';
    }

    // Validate Age
    const age = parseInt(formData.age, 10);
    if (isNaN(age)) {
      errors.age = 'Age must be a number.';
    } else if (age < 50 || age > 110) {
      errors.age = 'Age must be between 50 and 110.';
    }

    // Validate Password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors;
    }

    // Validate Gender
    if (!formData.gender) {
      errors.gender = 'Gender is required.';
    }

    // Validate Blood Group
    if (!formData.bloodGroup) {
      errors.bloodGroup = 'Blood Group is required.';
    }

    return errors;
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8 || password.length > 16) {
      errors.push('Password must be 8-16 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one capital letter.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character.');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop form submission if there are errors
    }

    try {
      const response = await fetch('http://localhost:5000/api/seniors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          navigate('/login'); // Redirect to Login page after successful registration
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        const data = await response.json();
        setErrors({ server: data.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ server: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="registration-form">
      <h2>Senior Citizen Registration</h2>
      {formSubmitted ? (
        <div className="confirmation-message">
          <p>Your registration has been successfully submitted!</p>
          <p>Redirecting to the Login page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} autoComplete="off"> {/* Disable autofill for the entire form */}
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="new-password" // Disable autofill
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="new-password" // Disable autofill
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="new-password" // Disable autofill
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength="10" // Limit input to 10 digits
              autoComplete="new-password" // Disable autofill
            />
            {errors.phone && (
              <div className="error-messages">
                <p className="error-message">{errors.phone}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              autoComplete="new-password" // Disable autofill
            />
          </div>
          <div>
    <label htmlFor="relativeEmail">Relative's Email:</label>
    <input
      type="email"
      id="relativeEmail"
      name="relativeEmail"
      value={formData.relativeEmail}
      onChange={handleChange}
      required
    />
  </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && (
              <div className="error-messages">
                <p className="error-message">{errors.age}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <div className="error-messages">
                <p className="error-message">{errors.gender}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && (
              <div className="error-messages">
                <p className="error-message">{errors.bloodGroup}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="medicalHistory">Medical History:</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="currentMedicalIssue">Current Medical Issue:</label>
            <textarea
              id="currentMedicalIssue"
              name="currentMedicalIssue"
              value={formData.currentMedicalIssue}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContact">Emergency Contact:</label>
            <input
              type="tel"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
              maxLength="10" // Limit input to 10 digits
              autoComplete="new-password" // Disable autofill
            />
            {errors.emergencyContact && (
              <div className="error-messages">
                <p className="error-message">{errors.emergencyContact}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password" // Disable autofill
            />
            {errors.password && (
              <div className="error-messages">
                {errors.password.map((error, index) => (
                  <p key={index} className="error-message">{error}</p>
                ))}
              </div>
            )}
          </div>
          {errors.server && (
            <div className="error-messages">
              <p className="error-message">{errors.server}</p>
            </div>
          )}
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;