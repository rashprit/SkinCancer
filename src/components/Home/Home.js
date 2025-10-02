// Home.js - Professional Medical Design
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'Clinical-Grade Skin Analysis';
  const whyChooseRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleLearnMoreClick = () => {
    whyChooseRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>
            {animatedText}
            <span className="cursor">|</span>
          </h1>
          <p>
            AI-powered dermatological analysis using validated machine learning algorithms. 
            Receive professional-grade assessment of skin lesions with clinical accuracy.
          </p>
          <div className="cta-buttons">
            <Link to="/SignUp">
              <button className="btn-primary">Begin Analysis</button>
            </Link>
            <button className="btn-secondary" onClick={handleLearnMoreClick}>
              Clinical Details
            </button>
          </div>
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">95.2%</div>
            <div className="stat-label">Clinical Accuracy</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Analyses Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">User Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Availability</div>
          </div>
        </div>
      </section>

      <section className="mid-page-section" ref={whyChooseRef}>
        <div className="section-header">
          <h2>Medical-Grade Technology</h2>
          <p>Validated AI algorithms for professional dermatological assessment</p>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Validated AI Analysis</h3>
            <p>Clinically validated neural networks trained on 50,000+ dermatological images with peer-reviewed accuracy metrics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>HIPAA Compliant</h3>
            <p>Enterprise-grade security with end-to-end encryption and HIPAA-compliant data protection protocols</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Clinical Integration</h3>
            <p>Seamless integration with healthcare systems and electronic medical records for continuity of care</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Professional Reporting</h3>
            <p>Comprehensive clinical reports with detailed analysis, risk assessment, and follow-up recommendations</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready for Professional Assessment?</h2>
          <p>Join healthcare professionals using SkinCheck Medical for preliminary dermatological analysis</p>
          <div className="cta-buttons">
            <Link to="/SignUp">
              <button className="btn-primary">Start Clinical Trial</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;