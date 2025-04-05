import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTrophy, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  const [activeModule, setActiveModule] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleModuleClick = (module) => {
    setActiveModule(module);
  };

  const closeModule = () => {
    setActiveModule(null);
  };

  return (
    <div className="homepage">
      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to ElderEase</h1>
        <p>Your trusted partner in senior citizen care.</p>

        {/* Login and Registration Buttons */}
        <div className="auth-buttons">
          <button onClick={() => navigate('/register')} className="button">Register</button>
          <button onClick={() => navigate('/login')} className="button">Login</button>
          <button onClick={() => navigate('/medications')} className="button">Medications</button> {/* New Medications Button */}
        </div>
      </div>

      {/* Module Overlay */}
      {activeModule && (
        <div className="module-overlay">
          <div className="module-content">
            <button className="close-button" onClick={closeModule}>×</button>
            {activeModule === 'emergency' && (
              <>
                <h2>Emergency Assistance</h2>
                <p>In case of an emergency, click the button below to alert your caregiver or emergency services.</p>
                <button className="emergency-button">Panic Button</button>
              </>
            )}
            {activeModule === 'achievements' && (
              <>
                <h2>Achievements</h2>
                <p>Track your milestones and achievements here.</p>
                <ul>
                  <li>Completed 10 medication reminders</li>
                  <li>Attended 5 community events</li>
                  <li>Reached 1000 steps in a day</li>
                </ul>
              </>
            )}
            {activeModule === 'rate' && (
              <>
                <h2>Rate Us & Feedback</h2>
                <p>We value your feedback! Please rate us and share your experience.</p>
                <textarea placeholder="Your feedback..." rows="4"></textarea>
                <button className="submit-button">Submit</button>
              </>
            )}
            {activeModule === 'guidelines' && (
              <>
                <h2>Community Guidelines</h2>
                <p>Please follow these guidelines to ensure a safe and respectful community:</p>
                <ul>
                  <li>Be kind and respectful to others.</li>
                  <li>Do not share personal information publicly.</li>
                  <li>Report any inappropriate behavior to the admin.</li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;