// Dashboard.js - Updated with NearbyDoctors navigation
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import CountUp from './CountUp';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      
      if (!token || !email) {
        navigate('/auth');
        return false;
      }
      
      setUserEmail(email);
      const name = email.split('@')[0];
      setUserName(name);
      setUserInitials(name.charAt(0).toUpperCase());
      return true;
    };

    checkAuth();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const isActiveTab = (path) => {
    return location.pathname === `/dashboard/${path}` || 
           (path === 'upload' && location.pathname === '/dashboard');
  };

  if (!userName) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Verifying credentials...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <div className="logo-icon">🩺</div>
          <span>SkinCheck</span>
          <span className="logo-subtitle">Medical</span>
        </div>
        
        <div className="user-menu">
          <div 
            className="user-profile" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            tabIndex={0}
            onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
          >
            {userInitials}
          </div>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <div className="user-avatar">{userInitials}</div>
                <div className="user-details">
                  <div className="user-name">{userName}</div>
                  <div className="user-email">{userEmail}</div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item">
                <span className="dropdown-icon">👤</span>
                My Profile
              </button>
              
              <button className="dropdown-item">
                <span className="dropdown-icon">⚙️</span>
                Account Settings
              </button>
              
              <div className="dropdown-divider"></div>
              
              <button 
                className="dropdown-item sign-out" 
                onClick={handleSignOut}
              >
                <span className="dropdown-icon">↩️</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h1>Welcome back, {userName}</h1>
          <p>Professional skin lesion analysis and tracking</p>
        </section>

        <section className="stats-cards">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>Total Scans</h3>
                <CountUp end="12" />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon success">✅</div>
              <div className="stat-info">
                <h3>Benign Results</h3>
                <CountUp end="10" />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon warning">⚠️</div>
              <div className="stat-info">
                <h3>Flagged Results</h3>
                <CountUp end="2" />
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">🕒</div>
              <div className="stat-info">
                <h3>Last Scan</h3>
                <p className="stat-value">3 days ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Navigation with Nearby Doctors */}
        <nav className="dashboard-nav">
          <Link 
            to="upload" 
            className={`nav-tab ${isActiveTab('upload') ? 'active' : ''}`}
          >
            <span className="tab-icon">📸</span>
            New Analysis
          </Link>
          <Link 
            to="history" 
            className={`nav-tab ${isActiveTab('history') ? 'active' : ''}`}
          >
            <span className="tab-icon">📋</span>
            Scan History
          </Link>
          <Link 
            to="results" 
            className={`nav-tab ${isActiveTab('results') ? 'active' : ''}`}
          >
            <span className="tab-icon">🔍</span>
            Results
          </Link>
          <Link 
            to="nearby-doctors" 
            className={`nav-tab ${isActiveTab('nearby-doctors') ? 'active' : ''}`}
          >
            <span className="tab-icon">🏥</span>
            Find Doctors
          </Link>
          <Link 
            to="resources" 
            className={`nav-tab ${isActiveTab('resources') ? 'active' : ''}`}
          >
            <span className="tab-icon">📚</span>
            Resources
          </Link>
        </nav>

        <div className="main-content">
          <Outlet context={{ userName }} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;