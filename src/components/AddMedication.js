import React, { useState } from 'react';
import axios from 'axios';
import './AddMedication.css';

const AddMedication = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [medicine, setMedicine] = useState(''); // ✅ Fixed state declaration
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timing, setTiming] = useState('');
  const [foodDiet, setFoodDiet] = useState('');
  const [syrups, setSyrups] = useState('');
  const [syrupMl, setSyrupMl] = useState('');
  const [syrupFrequency, setSyrupFrequency] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddMedication = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (!phone || !password || !medicine || !dose || !frequency || !timing || !foodDiet) {
      setError('All required fields must be filled.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/seniors/medications/add', {
        phone,
        password,
        medicine, // ✅ Fixed variable
        dose,
        frequency,
        timing,
        foodDiet,
        syrups,
        syrupMl,
        syrupFrequency,
      });

      setMessage('Medication added successfully!');
      setPhone('');
      setPassword('');
      setMedicine(''); // ✅ Reset medicine state
      setDose('');
      setFrequency('');
      setTiming('');
      setFoodDiet('');
      setSyrups('');
      setSyrupMl('');
      setSyrupFrequency('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add medication.');
    }
    setLoading(false);
  };

  return (
    <div className="medications-page">
      <h1>Add Medication</h1>
      <form onSubmit={handleAddMedication} className="medication-form">
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
        <input
          type="text"
          placeholder="Medicine" // ✅ Updated placeholder
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dose"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Frequency (e.g., Twice a Day)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Timing (e.g., Morning, Night)"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Food/Diet (e.g., After Meal)"
          value={foodDiet}
          onChange={(e) => setFoodDiet(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Syrup Name (Optional)"
          value={syrups}
          onChange={(e) => setSyrups(e.target.value)}
        />
        <input
          type="text"
          placeholder="Syrup ML (Optional)"
          value={syrupMl}
          onChange={(e) => setSyrupMl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Syrup Frequency (Optional)"
          value={syrupFrequency}
          onChange={(e) => setSyrupFrequency(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Medication'}
        </button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddMedication;
