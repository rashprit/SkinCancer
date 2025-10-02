// Results.js - Enhanced
import React from 'react';

const Results = () => {
  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Scan Results</h1>
        <p>Detailed analysis of your skin lesion scans</p>
      </div>
      
      <div className="results-grid">
        <div className="result-card">
          <div className="result-icon">🔍</div>
          <h3>Recent Analysis</h3>
          <p>View your most recent skin scan results and recommendations</p>
          <button className="btn-primary">View Details</button>
        </div>
        
        <div className="result-card">
          <div className="result-icon">📊</div>
          <h3>History</h3>
          <p>Track your scan history and monitor changes over time</p>
          <button className="btn-secondary">View History</button>
        </div>
        
        <div className="result-card">
          <div className="result-icon">📋</div>
          <h3>Reports</h3>
          <p>Download detailed reports for medical consultations</p>
          <button className="btn-secondary">Generate Report</button>
        </div>
      </div>
      
      <div className="results-cta">
        <h2>Need a new analysis?</h2>
        <p>Upload a new image to get started with AI-powered skin cancer detection</p>
        <button className="btn-primary" style={{marginTop: '1rem'}}>
          New Scan
        </button>
      </div>
    </div>
  );
};

export default Results;