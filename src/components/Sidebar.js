import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [activeModule, setActiveModule] = useState(null);

  const handleModuleClick = (module) => {
    setActiveModule(module);
  };

  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li onClick={() => handleModuleClick('emergency')}>Emergency Assistance</li>
        <li onClick={() => handleModuleClick('achievements')}>Achievements</li>
        <li onClick={() => handleModuleClick('rate')}>Rate Us & Feedback</li>
        <li onClick={() => handleModuleClick('guidelines')}>Community Guidelines</li>
      </ul>

      {/* Display Active Module Content */}
      {activeModule && (
        <div className="module-overlay">
          <div className="module-content">
            <button className="close-button" onClick={() => setActiveModule(null)}>×</button>
            {activeModule === 'emergency' && (
              <>
                <h3>Emergency Assistance</h3>
                <p>In case of an emergency, click the button below to alert your caregiver or emergency services.</p>
                <button className="emergency-button">Panic Button</button>
              </>
            )}

            {activeModule === 'achievements' && (
              <>
                <h3>Achievements</h3>
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
                <h3>Rate Us & Feedback</h3>
                <p>We value your feedback! Please rate us and share your experience.</p>
                <textarea placeholder="Your feedback..." rows="4"></textarea>
                <button className="submit-button">Submit</button>
              </>
            )}

            {activeModule === 'guidelines' && (
              <>
                <h3>Community Guidelines</h3>
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

export default Sidebar;