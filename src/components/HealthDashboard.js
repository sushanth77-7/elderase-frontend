import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HealthDashboard.css";

const HealthDashboard = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Fetch Medications from API
  const fetchMedications = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/seniors/medications/get",
        { phone, password }
      );

      console.log("API Response:", response.data); // Debugging

      if (Array.isArray(response.data.medications)) {
        setMedications(response.data.medications);
      } else {
        setMedications([]);
      }

      setError("");
    } catch (err) {
      console.error("Error fetching medications:", err);
      setError("Invalid phone or password.");
    }
    setLoading(false);
  };

  // ✅ Auto-refresh medications every 30s
  useEffect(() => {
    if (isAuthenticated) {
      fetchMedications(); // ✅ Fetch once immediately
      const interval = setInterval(fetchMedications, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // ✅ Handle Login & Fetch Medications
  const handleLogin = async () => {
    await fetchMedications();
    setIsAuthenticated(true); // ✅ Ensure authentication state is updated
  };

  // ✅ Mark Medication as Taken
  const markAsTaken = async (medId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/seniors/medications/mark-taken",
        { phone, password, medId, taken: true }
      );

      console.log("Mark Taken Response:", response.data);
      console.log("Response Status:", response.status);

      // ✅ Check if API response contains success message
      if (response.data.message === "Medication marked as taken") {
        // ✅ Update state instantly
        setMedications((prevMeds) =>
          prevMeds.map((med) =>
            med._id === medId ? { ...med, taken: true } : med
          )
        );
      } else {
        alert("❌ Medication status update failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error marking medication as taken!");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Health Analysis Dashboard</h2>

      {!isAuthenticated ? (
        <div className="login-popup">
          <h3>Login to View Medications</h3>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <>
          {medications.length > 0 ? (
            <ul>
              {medications.map((med) => (
                <li key={med._id}>
                  {med.medicine} - {med.timing}{" "}
                  <button
                    onClick={() => markAsTaken(med._id)}
                    disabled={med.taken}
                  >
                    {med.taken ? "✅ Taken" : "✅ Mark as Taken"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medications found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default HealthDashboard;
