// NearbyDoctors.js - Professional Medical Design
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './NearbyDoctors.css';

const NearbyDoctors = () => {
  const { userName } = useOutletContext();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  // Mock data for demonstration
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen, MD',
      specialty: 'Dermatology & Mohs Surgery',
      distance: '0.8 miles',
      rating: 4.8,
      reviews: 127,
      phone: '(555) 123-4567',
      address: '123 Medical Center Drive, Suite 400',
      city: 'San Francisco, CA 94102',
      availability: 'Next available: Tomorrow',
      insurance: ['Blue Cross', 'Aetna', 'UnitedHealthcare'],
      education: 'Harvard Medical School',
      experience: '15 years',
      image: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez, MD',
      specialty: 'Skin Cancer Specialist',
      distance: '1.2 miles',
      rating: 4.9,
      reviews: 89,
      phone: '(555) 234-5678',
      address: '456 Health Park Avenue',
      city: 'San Francisco, CA 94103',
      availability: 'Next available: Today',
      insurance: ['Blue Cross', 'Cigna', 'Medicare'],
      education: 'Johns Hopkins University',
      experience: '12 years',
      image: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Emily Watson, MD',
      specialty: 'Cosmetic & Medical Dermatology',
      distance: '2.1 miles',
      rating: 4.7,
      reviews: 203,
      phone: '(555) 345-6789',
      address: '789 Skin Care Boulevard, Floor 3',
      city: 'San Francisco, CA 94104',
      availability: 'Next available: Monday',
      insurance: ['Aetna', 'UnitedHealthcare', 'Cigna'],
      education: 'Stanford Medical School',
      experience: '18 years',
      image: '👩‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. James Kim, MD, PhD',
      specialty: 'Pediatric Dermatology',
      distance: '3.5 miles',
      rating: 4.9,
      reviews: 156,
      phone: '(555) 456-7890',
      address: '321 Children\'s Hospital Way',
      city: 'San Francisco, CA 94105',
      availability: 'Next available: Wednesday',
      insurance: ['Blue Cross', 'Medicaid', 'Kaiser'],
      education: 'UCSF School of Medicine',
      experience: '14 years',
      image: '👨‍⚕️'
    }
  ];

  const specialties = [
    'all',
    'dermatology',
    'skin cancer',
    'cosmetic',
    'pediatric',
    'mohs surgery'
  ];

  const findDoctors = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationAccess(true);
            setDoctors(mockDoctors);
            setLoading(false);
          },
          (error) => {
            console.error('Location access denied:', error);
            // Fallback: still show doctors but indicate location not available
            setLocationAccess(false);
            setDoctors(mockDoctors);
            setLoading(false);
          }
        );
      } else {
        // Browser doesn't support geolocation
        setLocationAccess(false);
        setDoctors(mockDoctors);
        setLoading(false);
      }
    }, 1500);
  };

  const handleBookAppointment = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    alert(`Initiating appointment booking with ${doctor.name}\nPhone: ${doctor.phone}`);
    // In a real app, this would open a booking modal or redirect to booking service
  };

  const handleCall = (phoneNumber) => {
    alert(`Calling: ${phoneNumber}\n\nIn a real application, this would initiate a phone call.`);
  };

  const getDirections = (address, city) => {
    const fullAddress = `${address}, ${city}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(mapsUrl, '_blank');
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = filterSpecialty === 'all' || 
      doctor.specialty.toLowerCase().includes(filterSpecialty);
    const matchesLocation = searchLocation === '' || 
      doctor.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      doctor.city.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesSpecialty && matchesLocation;
  });

  useEffect(() => {
    // Auto-find doctors when component loads
    findDoctors();
  }, []);

  return (
    <div className="nearby-doctors-content">
      <div className="content-header">
        <div className="header-text">
          <h2>Find Dermatologists</h2>
          <p>Locate qualified skin specialists in your area for professional consultation</p>
        </div>
        <div className="header-actions">
          <button 
            className="refresh-btn"
            onClick={findDoctors}
            disabled={loading}
          >
            {loading ? '🔄 Searching...' : '🔍 Refresh Results'}
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="📍 Search by location or address..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            className="specialty-filter"
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
          >
            <option value="all">All Specialties</option>
            <option value="dermatology">General Dermatology</option>
            <option value="skin cancer">Skin Cancer</option>
            <option value="cosmetic">Cosmetic Dermatology</option>
            <option value="pediatric">Pediatric Dermatology</option>
            <option value="mohs surgery">Mohs Surgery</option>
          </select>
          <div className="results-count">
            {filteredDoctors.length} specialist{filteredDoctors.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {!locationAccess && (
        <div className="location-notice">
          <div className="notice-icon">📍</div>
          <div className="notice-text">
            <strong>Location access limited:</strong> Showing dermatologists in the San Francisco area. 
            Enable location services for more accurate results.
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner-large"></div>
          <h3>Searching for Dermatologists</h3>
          <p>Scanning medical networks in your area...</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-header">
                <div className="doctor-avatar">
                  {doctor.image}
                </div>
                <div className="doctor-basic-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <div className="doctor-rating">
                    <span className="rating-stars">⭐ {doctor.rating}/5</span>
                    <span className="rating-reviews">({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="doctor-details">
                <div className="detail-item">
                  <span className="detail-icon">🎓</span>
                  <span className="detail-text">{doctor.education}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text">{doctor.experience} experience</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{doctor.distance} away</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🕒</span>
                  <span className="detail-text">{doctor.availability}</span>
                </div>
              </div>

              <div className="doctor-contact">
                <div className="contact-address">
                  <strong>Address:</strong><br />
                  {doctor.address}<br />
                  {doctor.city}
                </div>
                <div className="contact-phone">
                  <strong>Phone:</strong> {doctor.phone}
                </div>
              </div>

              <div className="insurance-section">
                <div className="insurance-label">Accepted Insurance:</div>
                <div className="insurance-tags">
                  {doctor.insurance.map((insurer, index) => (
                    <span key={index} className="insurance-tag">{insurer}</span>
                  ))}
                </div>
              </div>

              <div className="doctor-actions">
                <button 
                  className="btn-primary"
                  onClick={() => handleBookAppointment(doctor.id)}
                >
                  📅 Book Appointment
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => handleCall(doctor.phone)}
                >
                  📞 Call Office
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => getDirections(doctor.address, doctor.city)}
                >
                  🗺️ Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredDoctors.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No Dermatologists Found</h3>
          <p>Try adjusting your search criteria or location settings</p>
          <button className="btn-primary" onClick={findDoctors}>
            Search Again
          </button>
        </div>
      )}

      <div className="medical-disclaimer">
        <h4>Medical Disclaimer</h4>
        <p>
          This service helps you locate dermatologists in your area. Always verify credentials, 
          insurance acceptance, and availability directly with the healthcare provider. 
          In case of medical emergency, call 911 or visit the nearest emergency room.
        </p>
      </div>
    </div>
  );
};

export default NearbyDoctors;