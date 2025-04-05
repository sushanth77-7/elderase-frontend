import React from 'react';
import './CommunityPage.css';

const CommunityPage = () => {
  return (
    <div className="community-page">
      <h2>Community Guidelines</h2>
      <p className="subtitle">Please follow these guidelines to ensure a safe and respectful community:</p>
      <ul>
        <li>🌟 Be kind and respectful to others.</li>
        <li>🔒 Do not share personal information publicly.</li>
        <li>🚨 Report any inappropriate behavior to the admin.</li>
      </ul>
      <div className="additional-guidelines">
        <p>
          🌈 <strong>Embrace Diversity:</strong> Our community is made up of individuals from all walks of life. 
          Celebrate differences and treat everyone with respect, regardless of their background, beliefs, or opinions.
        </p>
        <p>
          💬 <strong>Constructive Communication:</strong> When sharing feedback or engaging in discussions, 
          focus on being constructive and supportive. Avoid negative or harmful language that could hurt others.
        </p>
        <p>
          🤝 <strong>Collaborate and Share:</strong> This platform thrives on collaboration. Share your knowledge, 
          experiences, and ideas to help others grow and learn. Together, we can build a stronger community.
        </p>
        <p>
          🌟 <strong>Stay Positive:</strong> Encourage positivity and kindness in all interactions. A positive 
          environment helps everyone feel welcome and valued.
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;