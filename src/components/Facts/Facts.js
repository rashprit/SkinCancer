// Facts.js - Enhanced
import React from 'react';
import './Facts.css';

const Facts = () => {
    const facts = [
        'More than 90% of skin cancers are caused by sun exposure.',
        'There are more new cases of skin cancer each year than the combined incidence of cancers of the breast, prostate, lung and colon.',
        'Regular daily use of an SPF 15 or higher sunscreen reduces the risk of developing melanoma by 50%.',
        'Melanoma is the most serious type of skin cancer and can spread to other organs.',
        'The 5-year survival rate for people whose melanoma is detected and treated before it spreads to the lymph nodes is 99%.',
        'Skin cancer can affect people of all skin tones, not just those with fair skin.',
        'One in five Americans will develop skin cancer by the age of 70.',
        'Having 5 or more sunburns doubles your risk for melanoma.',
        'The ABCD rule helps identify warning signs of melanoma: Asymmetry, Border, Color, Diameter.',
        'Early detection and treatment are crucial for successful outcomes.'
    ];

    const handleEmergencyCall = () => {
        alert('Calling Cancer Council Helpline at 13 11 20');
        // Implement actual calling logic
    };

    return (
        <div className="facts">
            <h1>Skin Cancer Facts & Information</h1>
            <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem'}}>
                Important information about skin cancer prevention, detection, and treatment
            </p>
            
            <div className="fact-highlight">
                <p>More than 90% of skin cancers are caused by sun exposure.</p>
            </div>

            <h2>Essential Skin Cancer Facts</h2>
            <div className="facts-grid">
                {facts.slice(1).map((fact, index) => (
                    <div key={index} className="fact-card">
                        <p>{fact}</p>
                    </div>
                ))}
            </div>

            <div className="helpline-section">
                <h2>Emergency Helpline</h2>
                <p className="helpline-info">
                    If you have a skin concern, please contact a healthcare professional immediately.
                </p>
                <div className="helpline-number">13 11 20</div>
                <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>
                    Cancer Council Helpline - Available 24/7
                </p>
                <button className="emergency-button" onClick={handleEmergencyCall}>
                    🚨 Call Now
                </button>
            </div>

            <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
            }}>
                <h3>Remember</h3>
                <p style={{margin: 0, color: 'var(--text-secondary)'}}>
                    Regular skin checks and sun protection are your best defense against skin cancer.
                </p>
            </div>
        </div>
    );
};

export default Facts;