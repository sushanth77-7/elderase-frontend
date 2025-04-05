import React, { useState } from 'react';
import axios from 'axios';
import './YourMedications.css';

const YourMedications = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchMedications = async (e) => {
    e.preventDefault();
    setError('');
    setMedications([]);
    setLoading(true);

    if (!phone || !password) {
      setError('Phone and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/seniors/medications/get', { phone, password });
      setMedications(response.data.medications);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch medications.');
    }
    setLoading(false);
  };

  return (
    <div className="medications-page">
      <h1>Your Medications</h1>
      <form onSubmit={handleFetchMedications} className="medication-form">
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'View Medications'}
        </button>
      </form>
      
      {error && <p className="error">{error}</p>}

      {medications.length > 0 && (
        <div className="medication-list">
          <h2>Saved Medications</h2>
          <ul>
            {medications.map((med, index) => (
              <li key={index}>
                <strong>Medicine:</strong> {med.medicine} <br />
                <strong>Dose:</strong> {med.dose} <br />
                <strong>Frequency:</strong> {med.frequency} <br />
                <strong>Timing:</strong> {med.timing} <br />
                <strong>Food/Diet:</strong> {med.foodDiet} <br />
                {med.syrups && (
                  <>
                    <strong>Syrup:</strong> {med.syrups} <br />
                    <strong>Syrup Ml:</strong> {med.syrupMl} <br />
                    <strong>Syrup Frequency:</strong> {med.syrupFrequency} <br />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default YourMedications;
