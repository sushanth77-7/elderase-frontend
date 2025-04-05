import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page
    setFormSubmitted(true); // Set the form as submitted
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions or need support, please reach out to us:</p>
      <ul>
        <li>Email: support@elderease.com</li>
        <li>Phone: +1 (123) 456-7890</li>
        <li>Address: 123 ElderEase Lane, Care City, USA</li>
      </ul>

      {formSubmitted ? (
        <div className="confirmation-message">
          <p>Your request has been received. Soon we will notify you with a solution.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Contact;