import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHome, FaTools } from 'react-icons/fa';
import './vacation-plan.css';

const VacationPlan = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic would go here
    console.log({ location, dates, guests, activeTab });
  };

  return (
    <div className="vacation-plan-container">
      <div className="vacation-header">
        <h2>Plan Your Perfect Vacation</h2>
        <p>Find properties, services, and roommates for your next getaway</p>
      </div>

      {/* Search Form */}
      <form className="vacation-search-form" onSubmit={handleSearch}>
        <div className="search-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <FaHome /> Properties
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FaTools /> Services
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'roommates' ? 'active' : ''}`}
            onClick={() => setActiveTab('roommates')}
          >
            <FaUsers /> Roommates
          </button>
        </div>

        <div className="search-fields">
          <div className="search-field">
            <FaMapMarkerAlt className="field-icon" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="search-field">
            <FaCalendarAlt className="field-icon" />
            <input
              type="text"
              placeholder="Dates"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              required
            />
          </div>

          <div className="search-field">
            <FaUsers className="field-icon" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
              <option value="9+">9+ Guests</option>
            </select>
          </div>

          <button type="submit" className="search-button">
            <FaSearch /> Search
          </button>
        </div>
      </form>

      {/* Content based on active tab */}
      <div className="vacation-content">
        {activeTab === 'properties' && (
          <div className="properties-tab">
            <h3>Beautiful Vacation Properties</h3>
            <div className="property-grid">
              {/* Property cards would be rendered here */}
              <div className="property-card">
                <div className="property-image placeholder"></div>
                <div className="property-details">
                  <h4>Beachfront Villa</h4>
                  <p className="location"><FaMapMarkerAlt /> Malibu, California</p>
                  <p className="price">$250/night</p>
                  <div className="amenities">
                    <span>4 Guests</span>
                    <span>2 Bedrooms</span>
                    <span>Pool</span>
                  </div>
                </div>
              </div>
              {/* More property cards... */}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="services-tab">
            <h3>Vacation Services</h3>
            <div className="service-categories">
              <div className="category-card">
                <div className="category-icon cleaning"></div>
                <h4>Cleaning Services</h4>
              </div>
              <div className="category-card">
                <div className="category-icon chef"></div>
                <h4>Private Chef</h4>
              </div>
              <div className="category-card">
                <div className="category-icon tours"></div>
                <h4>Local Tours</h4>
              </div>
              {/* More service categories... */}
            </div>
          </div>
        )}

        {activeTab === 'roommates' && (
          <div className="roommates-tab">
            <h3>Find Vacation Roommates</h3>
            <div className="roommate-profiles">
              <div className="profile-card">
                <div className="profile-image placeholder"></div>
                <div className="profile-details">
                  <h4>Sarah M.</h4>
                  <p className="travel-dates">Jun 15-30, 2023</p>
                  <p className="destination">Looking in: Bali, Indonesia</p>
                  <div className="interests">
                    <span>Beaches</span>
                    <span>Yoga</span>
                    <span>Vegetarian</span>
                  </div>
                </div>
              </div>
              {/* More roommate profiles... */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacationPlan;