// History.js - Fixed (remove duplicate navigation)
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './History.css';

const History = () => {
  const { userName } = useOutletContext();
  const [scanHistory, setScanHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      { id: 'SCN-001', date: '2023-10-27', result: 'Benign', accuracy: '98.2%', image: 'mole_001.jpg' },
      { id: 'SCN-002', date: '2023-10-25', result: 'Malignant', accuracy: '92.5%', image: 'lesion_002.jpg' },
      { id: 'SCN-003', date: '2023-10-22', result: 'Benign', accuracy: '99.1%', image: 'spot_003.jpg' },
      { id: 'SCN-004', date: '2023-10-18', result: 'Benign', accuracy: '96.8%', image: 'mole_004.jpg' },
      { id: 'SCN-005', date: '2023-10-15', result: 'Malignant', accuracy: '94.2%', image: 'lesion_005.jpg' },
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setScanHistory(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredScans = scanHistory.filter(scan => {
    const matchesSearch = scan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scan.result.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || scan.result.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    alert('Exporting scan history...');
    // Implement export functionality
  };

  const getResultClass = (result) => {
    return result.toLowerCase() === 'malignant' ? 'malignant' : 'benign';
  };

  if (loading) {
    return (
      <div className="history-content">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your scan history...</p>
        </div>
      </div>
    );
  }

  if (scanHistory.length === 0) {
    return (
      <div className="history-content">
        <div className="empty-state">
          <div className="icon">📊</div>
          <h3>No Scan History Yet</h3>
          <p>You haven't performed any skin scans yet. Start by uploading your first image for analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-content">
      <div className="scan-history-section">
        <div className="history-title">
          <h2>Scan History</h2>
          <p>Review your previous skin analysis results</p>
        </div>
        
        <div className="search-filter-bar">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search scans by ID or classification..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Results</option>
            <option value="benign">Benign Only</option>
            <option value="malignant">Malignant Only</option>
          </select>
        </div>
        
        <div className="scan-entries">
          {filteredScans.map((scan, index) => (
            <div 
              className="scan-entry" 
              key={scan.id} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="scan-id">{scan.id}</div>
              <div className="scan-date">{scan.date}</div>
              <div className={`scan-result ${getResultClass(scan.result)}`}>
                {scan.result}
              </div>
              <div className="scan-accuracy">{scan.accuracy}</div>
              <button className="view-details-button">
                View Details
              </button>
            </div>
          ))}
        </div>
        
        <div className="history-footer">
          <div className="history-stats">
            Showing {filteredScans.length} of {scanHistory.length} scans
          </div>
          <button className="export-button" onClick={handleExport}>
            📥 Export History
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;