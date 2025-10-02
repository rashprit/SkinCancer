// Resources.js - Updated with proper routing
import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

const Resources = () => {
  const educationalResources = [
    { name: 'Skin Cancer Prevention Guidelines', url: '#', icon: '🛡️' },
    { name: 'Self-Examination Techniques', url: '#', icon: '🔍' },
    { name: 'Understanding Moles and Lesions', url: '#', icon: '🔬' },
    { name: 'UV Protection Best Practices', url: '#', icon: '☀️' },
    { name: 'Early Detection Signs (ABCDE Rule)', url: '#', icon: '⚠️' },
    { name: 'Skin Cancer Treatment Options', url: '#', icon: '💊' }
  ];

  const additionalResources = [
    { name: 'Support Groups', description: 'Connect with others', icon: '👥' },
    { name: 'Clinical Trials', description: 'Research opportunities', icon: '🧪' },
    { name: 'Insurance Guide', description: 'Coverage information', icon: '📄' },
    { name: 'Mobile App', description: 'Skin tracking tools', icon: '📱' }
  ];

  return (
    <div className="resources-content">
      <div className="resources-header">
        <h1>Health Resources</h1>
        <p>Comprehensive information and support for skin health</p>
      </div>

      <div className="main-content">
        <div className="resource-section educational-resources">
          <h2>Educational Resources</h2>
          <ul className="resource-list">
            {educationalResources.map((resource, index) => (
              <li key={index} className="resource-item">
                <a href={resource.url} className="resource-link" target="_blank" rel="noopener noreferrer">
                  <span>{resource.icon}</span>
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="resource-section emergency-contacts">
          <h2>Emergency Contacts</h2>
          <div className="emergency-alert">
            <h3>Emergency Medical Services</h3>
            <div className="emergency-number">911</div>
            <p>Call for immediate medical assistance</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Dermatology Specialists</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Find qualified dermatologists in your area for professional consultation
            </p>
            {/* Updated Link to use React Router */}
            <Link to="/dashboard/nearby-doctors" className="find-doctors-button">
              🩺 Find Nearby Doctors
            </Link>
          </div>
        </div>
      </div>

      <div className="additional-resources">
        <h2>Additional Support Resources</h2>
        <div className="resource-grid">
          {additionalResources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-icon">{resource.icon}</div>
              <h3>{resource.name}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{resource.description}</p>
              <button className="tab" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;