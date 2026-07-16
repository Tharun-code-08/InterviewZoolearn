import { useState } from 'react';
import { Construction, CheckCircle2, Bell } from 'lucide-react';

export default function UnderConstruction() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="underdevelopment-container">
      <div className="underdevelopment-card">
        <div className="underdevelopment-icon-wrapper">
          <Construction size={64} strokeWidth={1.5} />
        </div>
        <h1 className="underdevelopment-title">Under Construction</h1>
        <p className="underdevelopment-message">
          We're building something amazing! This feature is currently in the lab and will be ready for you soon.
        </p>
        <div className="underdevelopment-progress-container">
          <div className="underdevelopment-progress-label">
            <span>Development Progress</span>
            <span>75%</span>
          </div>
          <div className="underdevelopment-progress-bar">
            <div className="underdevelopment-progress-fill"></div>
          </div>
        </div>
        {submitted ? (
          <div className="underdevelopment-success">
            <CheckCircle2 size={24} className="text-green-500" />
            <p>Thanks! We'll notify you when this page launches.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="underdevelopment-notify-form">
            <p className="underdevelopment-notify-text">Get notified when it's ready:</p>
            <div className="underdevelopment-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="underdevelopment-input"
                required
              />
              <button type="submit" className="underdevelopment-notify-btn">
                <Bell size={18} />
                Notify Me
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
