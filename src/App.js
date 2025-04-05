import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import About from './components/About';
import Services from './components/Services';
import AchievementsPage from './components/AchievementsPage';
import CommunityPage from './components/CommunityPage';
import RateUsPage from './components/RateUsPage';
import Contact from './components/Contact';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/Credential';
import UserDetails from './components/UserDetails';
import MedicationsPage from './components/MedicationsPage';
import AddMedication from './components/AddMedication'; // New Component
import HealthDashboard from "./components/HealthDashboard";

import YourMedications from './components/YourMedications'; // New Component
import './components/global.css';


import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <MenuBar />
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/community-guidelines" element={<CommunityPage />} />
          <Route path="/rate-us" element={<RateUsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user-details" element={<UserDetails />} />

          {/* New Routes for Medications */}
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/medications/add" element={<AddMedication />} />
          <Route path="/medications/view" element={<YourMedications />} />
          <Route path="/dashboard" element={<HealthDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;