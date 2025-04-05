import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; 
const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track login state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Form
    const newErrors = {};
    if (!loginData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!loginData.password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await fetch("http://localhost:5000/api/seniors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Logged in user:", user);
        navigate("/user-details", { state: { user } });
      } else {
        const data = await response.json();
        setErrors({ server: data.error || "Invalid phone or password." });
      }
    } catch (error) {
      setErrors({ server: "Server error. Please try again." });
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="registration-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={loginData.phone}
            onChange={handleChange}
            required
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
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {errors.server && <p className="error-message">{errors.server}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
