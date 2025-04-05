import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandsHelping,
  faTint,
  faCalendarAlt,
  faUsers,
  faHeart,
  faBook,
  faTree,
  faHandHoldingHeart,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import './AchievementsPage.css';

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      <h2>Our Achievements</h2>
      <p className="subtitle">Celebrating the milestones we’ve achieved together.</p>
      <div className="achievements-grid">
        <div className="achievement-card">
          <FontAwesomeIcon icon={faHandsHelping} className="achievement-icon" />
          <h3>Helped 2,000 Seniors</h3>
          <p>We’ve provided assistance and care to over 2,000 senior citizens.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faTint} className="achievement-icon" />
          <h3>Donated Blood to 1,000 Patients</h3>
          <p>Our team has donated blood to more than 1,000 patients in need.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faCalendarAlt} className="achievement-icon" />
          <h3>Organized 50+ Events</h3>
          <p>We’ve successfully organized over 50 community events.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faUsers} className="achievement-icon" />
          <h3>100+ Volunteers</h3>
          <p>More than 100 volunteers are actively contributing to our cause.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faHeart} className="achievement-icon" />
          <h3>Provided 5,000 Meals</h3>
          <p>We’ve distributed over 5,000 meals to those in need.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faBook} className="achievement-icon" />
          <h3>Taught 200+ Seniors</h3>
          <p>We’ve taught over 200 seniors new skills and hobbies.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faTree} className="achievement-icon" />
          <h3>Planted 1,000 Trees</h3>
          <p>We’ve planted 1,000 trees to promote a greener environment.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="achievement-icon" />
          <h3>Raised $50,000</h3>
          <p>We’ve raised $50,000 for community welfare programs.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faSmile} className="achievement-icon" />
          <h3>10,000+ Smiles</h3>
          <p>We’ve brought smiles to over 10,000 faces through our initiatives.</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;