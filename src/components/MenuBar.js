import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaBriefcase, FaTrophy, FaUsers, FaStar, FaEnvelope, FaChartBar, FaBell } from 'react-icons/fa';
import './MenuBar.css';

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li><Link to="/"> <FaHome className="icon" /> Home</Link></li>
        <li><Link to="/about"> <FaInfoCircle className="icon" /> About</Link></li>
        <li><Link to="/services"> <FaBriefcase className="icon" /> Services</Link></li>
        <li><Link to="/achievements"> <FaTrophy className="icon" /> Achievements</Link></li>
        <li><Link to="/community-guidelines"> <FaUsers className="icon" /> Community Guidelines</Link></li>
        <li><Link to="/rate-us"> <FaStar className="icon" /> Rate Us</Link></li>
        <li><Link to="/contact"> <FaEnvelope className="icon" /> Contact</Link></li>
        <li><Link to="/dashboard" className="dashboard-link"> <FaChartBar className="icon" /> Go to Health Analysis Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default MenuBar;
