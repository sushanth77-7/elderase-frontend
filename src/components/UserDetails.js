import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserDetails.css'; // Import the CSS file for styling
import { FaStethoscope, FaHeartbeat, FaBrain, FaBone, FaLungs, FaEye, FaTooth, FaProcedures, FaPills, FaPhone } from 'react-icons/fa'; // Icons for guide sections

// Medical issue guides
const medicalIssueGuides = {
  'leg pains': {
    overview: 'Leg pain in seniors can result from arthritis, poor circulation, or nerve damage. It is essential to identify the cause to manage the pain effectively.',
    symptoms: 'Pain, swelling, stiffness, redness, or warmth in the legs. Difficulty walking or standing for long periods.',
    causes: 'Arthritis, peripheral artery disease, sciatica, muscle strain, or blood clots.',
    prevention: 'Exercise regularly, maintain a healthy weight, avoid prolonged sitting or standing, and wear supportive footwear.',
    remedies: 'Rest, ice packs, compression, elevation, and over-the-counter pain relievers like ibuprofen.',
    whenToSeekHelp: 'If pain is severe, persistent, or accompanied by swelling, redness, or fever.',
    treatments: 'Physical therapy, medications, surgery (in severe cases), and lifestyle changes.',
    services: 'Orthopedists, physical therapists, vascular specialists.',
    emergencyContacts: 'Call 911 if you experience sudden, severe pain or inability to move.',
  },
  diabetes: {
    overview: 'Diabetes is a chronic condition that affects how your body processes blood sugar. Seniors are at higher risk due to age-related insulin resistance.',
    symptoms: 'Increased thirst, frequent urination, extreme fatigue, blurred vision, and slow-healing wounds.',
    causes: 'Insulin resistance, genetics, obesity, sedentary lifestyle, and poor diet.',
    prevention: 'Maintain a healthy diet, exercise regularly, monitor blood sugar levels, and avoid smoking.',
    remedies: 'Eat a balanced diet, stay hydrated, avoid sugary foods, and take prescribed medications.',
    whenToSeekHelp: 'If you experience severe symptoms like confusion, rapid breathing, or fainting.',
    treatments: 'Insulin therapy, oral medications, lifestyle changes, and regular check-ups.',
    services: 'Endocrinologists, diabetes educators, nutritionists.',
    emergencyContacts: 'Call 911 or visit the nearest emergency room for severe symptoms.',
  },
  arthritis: {
    overview: 'Arthritis is inflammation of the joints, causing pain and stiffness. It is common in seniors and can affect mobility.',
    symptoms: 'Joint pain, swelling, stiffness, redness, and reduced range of motion.',
    causes: 'Aging, genetics, previous joint injuries, and autoimmune disorders.',
    prevention: 'Maintain a healthy weight, exercise regularly, and avoid repetitive joint stress.',
    remedies: 'Hot/cold therapy, over-the-counter pain relievers, and gentle exercises like yoga.',
    whenToSeekHelp: 'If pain is severe, joints are swollen or deformed, or mobility is significantly reduced.',
    treatments: 'Medications, physical therapy, joint injections, and surgery (in severe cases).',
    services: 'Rheumatologists, physical therapists, orthopedic surgeons.',
    emergencyContacts: 'Call your doctor if symptoms worsen suddenly.',
  },
  hypertension: {
    overview: 'Hypertension (high blood pressure) is a common condition in seniors that increases the risk of heart disease and stroke.',
    symptoms: 'Often asymptomatic, but severe cases may cause headaches, dizziness, or blurred vision.',
    causes: 'Aging, poor diet, lack of exercise, stress, and genetics.',
    prevention: 'Eat a low-sodium diet, exercise regularly, avoid smoking, and limit alcohol.',
    remedies: 'Monitor blood pressure, take prescribed medications, and practice stress management.',
    whenToSeekHelp: 'If you experience severe headaches, chest pain, or difficulty breathing.',
    treatments: 'Medications, lifestyle changes, and regular monitoring.',
    services: 'Cardiologists, primary care physicians, nutritionists.',
    emergencyContacts: 'Call 911 if you experience chest pain or difficulty breathing.',
  },
  osteoporosis: {
    overview: 'Osteoporosis is a condition where bones become weak and brittle, increasing the risk of fractures.',
    symptoms: 'Back pain, loss of height, stooped posture, and frequent fractures.',
    causes: 'Aging, hormonal changes, calcium deficiency, and lack of physical activity.',
    prevention: 'Consume calcium-rich foods, get enough vitamin D, and engage in weight-bearing exercises.',
    remedies: 'Calcium and vitamin D supplements, medications, and fall prevention strategies.',
    whenToSeekHelp: 'If you experience sudden back pain or a fracture.',
    treatments: 'Medications, physical therapy, and lifestyle changes.',
    services: 'Endocrinologists, orthopedic specialists, physical therapists.',
    emergencyContacts: 'Call your doctor if you suspect a fracture.',
  },
  dementia: {
    overview: 'Dementia is a group of conditions characterized by memory loss, confusion, and cognitive decline.',
    symptoms: 'Memory loss, difficulty communicating, confusion, and mood changes.',
    causes: 'Aging, genetics, brain injuries, and diseases like Alzheimer’s.',
    prevention: 'Stay mentally active, maintain social connections, and manage chronic conditions.',
    remedies: 'Cognitive exercises, a healthy diet, and a structured daily routine.',
    whenToSeekHelp: 'If memory loss or confusion interferes with daily life.',
    treatments: 'Medications, cognitive therapy, and support groups.',
    services: 'Neurologists, geriatric specialists, psychologists.',
    emergencyContacts: 'Call your doctor if symptoms worsen suddenly.',
  },
  asthma: {
    overview: 'Asthma is a chronic condition that causes inflammation and narrowing of the airways, making breathing difficult.',
    symptoms: 'Wheezing, shortness of breath, chest tightness, and coughing.',
    causes: 'Allergies, pollution, respiratory infections, and genetics.',
    prevention: 'Avoid triggers, take prescribed medications, and maintain a clean environment.',
    remedies: 'Use inhalers, practice breathing exercises, and avoid smoking.',
    whenToSeekHelp: 'If you experience severe breathing difficulties or blue lips.',
    treatments: 'Inhalers, medications, and lifestyle changes.',
    services: 'Pulmonologists, allergists, primary care physicians.',
    emergencyContacts: 'Call 911 if breathing difficulties worsen suddenly.',
  },
  'heart disease': {
    overview: 'Heart disease refers to conditions that affect the heart, such as coronary artery disease and heart failure.',
    symptoms: 'Chest pain, shortness of breath, fatigue, and irregular heartbeat.',
    causes: 'High blood pressure, high cholesterol, smoking, and diabetes.',
    prevention: 'Eat a heart-healthy diet, exercise regularly, and avoid smoking.',
    remedies: 'Take prescribed medications, monitor blood pressure, and manage stress.',
    whenToSeekHelp: 'If you experience chest pain, shortness of breath, or fainting.',
    treatments: 'Medications, surgery, and lifestyle changes.',
    services: 'Cardiologists, primary care physicians, nutritionists.',
    emergencyContacts: 'Call 911 if you experience chest pain or difficulty breathing.',
  },
  'vision problems': {
    overview: 'Vision problems like cataracts, glaucoma, and macular degeneration are common in seniors.',
    symptoms: 'Blurred vision, difficulty seeing at night, and sensitivity to light.',
    causes: 'Aging, genetics, diabetes, and eye injuries.',
    prevention: 'Wear sunglasses, eat a healthy diet, and have regular eye exams.',
    remedies: 'Use prescribed glasses or contact lenses, and avoid straining your eyes.',
    whenToSeekHelp: 'If you experience sudden vision loss or severe eye pain.',
    treatments: 'Surgery, medications, and corrective lenses.',
    services: 'Ophthalmologists, optometrists, low-vision specialists.',
    emergencyContacts: 'Call your eye doctor if you experience sudden vision changes.',
  },
  'hearing loss': {
    overview: 'Hearing loss is a common condition in seniors, often caused by aging or exposure to loud noises.',
    symptoms: 'Difficulty hearing, ringing in the ears, and needing to increase volume on devices.',
    causes: 'Aging, genetics, exposure to loud noises, and ear infections.',
    prevention: 'Avoid loud noises, wear ear protection, and have regular hearing tests.',
    remedies: 'Use hearing aids, practice communication strategies, and avoid earwax buildup.',
    whenToSeekHelp: 'If hearing loss interferes with daily life or communication.',
    treatments: 'Hearing aids, surgery, and assistive devices.',
    services: 'Audiologists, ENT specialists, hearing aid providers.',
    emergencyContacts: 'Call your doctor if you experience sudden hearing loss.',
  },
};

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, medicalIssue } = location.state || {}; // Get user data and medical issue from navigation state

  if (!user) {
    return <div>No user data found. Please log in again.</div>;
  }

  // Fetch the guide for the entered medical issue (if provided)
  const guide = medicalIssueGuides[medicalIssue?.toLowerCase()] || null;

  return (
    <div className="user-details">
      <h2>Your Details</h2>
      <div className="details-container">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Relative Email:</strong> {user.relativeEmail}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Medical History:</strong> {user.medicalHistory}</p>
        <p><strong>Current Medical Issue:</strong> {user.currentMedicalIssue}</p>
        <p><strong>Emergency Contact:</strong> {user.emergencyContact}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
      </div>

      {/* Button to navigate to Medication Reminder */}
     

      {/* Display medical issue guide only if a medical issue is provided */}
      {guide && (
        <div className="medical-guide">
          <h2>Guide for {medicalIssue}</h2>
          <div className="guide-section">
            <h3><FaStethoscope /> Overview</h3>
            <p>{guide.overview}</p>
          </div>
          <div className="guide-section">
            <h3><FaHeartbeat /> Symptoms</h3>
            <p>{guide.symptoms}</p>
          </div>
          <div className="guide-section">
            <h3><FaBrain /> Causes & Risk Factors</h3>
            <p>{guide.causes}</p>
          </div>
          <div className="guide-section">
            <h3><FaBone /> Prevention Tips</h3>
            <p>{guide.prevention}</p>
          </div>
          <div className="guide-section">
            <h3><FaLungs /> Home Remedies & Self-Care</h3>
            <p>{guide.remedies}</p>
          </div>
          <div className="guide-section">
            <h3><FaEye /> When to Seek Medical Help</h3>
            <p>{guide.whenToSeekHelp}</p>
          </div>
          <div className="guide-section">
            <h3><FaTooth /> Available Treatments</h3>
            <p>{guide.treatments}</p>
          </div>
          <div className="guide-section">
            <h3><FaProcedures /> Related Healthcare Services</h3>
            <p>{guide.services}</p>
          </div>
          <div className="guide-section">
            <h3><FaPhone /> Emergency Contacts & Helplines</h3>
            <p>{guide.emergencyContacts}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;