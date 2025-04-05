import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicationsPage.css';

const MedicationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="medications-page">
      <h1>Medications</h1>
      <div className="medication-buttons">
        <button className="medication-button" onClick={() => navigate('/medications/add')}>
          Add Medication Reminder
        </button>
        <button className="medication-button" onClick={() => navigate('/medications/view')}>
          Your Medications
        </button>
      </div>
    </div>
  );
};

export default MedicationsPage;
