// Navbar.js - Simplified Professional Medical Navbar
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail) {
      setIsAuthenticated(true);
      const name = userEmail.split('@')[0];
      setUserName(name);
      setUserInitials(name.charAt(0).toUpperCase());
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setShowUserMenu(false);
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  // Don't show navbar on dashboard routes
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to="/">
          <span className="logo-icon">🩺</span>
          <span className="logo-text">SkinCheck</span>
          <span className="logo-subtitle">Medical</span>
        </Link>
      </div>

      {/* Sign In / User Profile Section */}
      <div className="navbar-actions">
        {isAuthenticated ? (
          <div 
            className="user-profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
            onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
            tabIndex={0}
          >
            <div className="user-avatar">
              {userInitials}
            </div>
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-role">Patient</div>
            </div>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    {userInitials}
                  </div>
                  <div className="dropdown-user-info">
                    <div className="dropdown-user-name">{userName}</div>
                    <div className="dropdown-user-email">
                      {localStorage.getItem('userEmail')}
                    </div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <Link to="/dashboard" className="dropdown-item">
                  <span className="dropdown-icon">📊</span>
                  Dashboard
                </Link>
                
                <button className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  My Profile
                </button>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  className="dropdown-item sign-out"
                  onClick={handleSignOut}
                >
                  <span className="dropdown-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="btn-nav signin-btn"
            onClick={handleSignIn}
          >
            <span className="btn-icon">🔐</span>
            <span className="btn-text">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;