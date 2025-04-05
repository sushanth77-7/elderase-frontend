import React, { useState } from 'react';
import './RateUsPage.css';

const RateUsPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="rate-us-page">
      <h2>Rate Us</h2>
      <p className="subtitle">We value your feedback! Please rate your experience and share your thoughts with us.</p>
      {submitted ? (
        <div className="success-message">
          <p>Feedback submitted successfully! Thank you for your input.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="rating-section">
            <label htmlFor="rating">Rating (0 to 10):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="10"
              value={rating}
              onChange={handleRatingChange}
              required
            />
          </div>
          <div className="feedback-section">
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea
              id="feedback"
              placeholder="Share your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default RateUsPage;