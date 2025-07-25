import React, { useState } from 'react';
import './HotelRegistration.css';
import { registerHotel } from '../../../../../api/admin/hotel/adminHotelApi'; // We'll create this

const HotelRegistration = ({ onClose, refresh }) => {
  const [formData, setFormData] = useState({
    hotelName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    amenities: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const dataToSend = {
                ...formData,
                amenities: formData.amenities.split(',').map(item => item.trim())
            };

            const response = await registerHotel(dataToSend);
           const onSuccess = (response.data); // Call the success callback
            onClose();
            refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <>
      <div className="hotel-application-overlay" onClick={onClose}></div>
      <div className="hotel-application-modal">
        <div className="hotel-application-form-container">
          <button className="hotel-application-close-btn" onClick={onClose}>
            &times;
          </button>
          
          <form className="hotel-application-form" onSubmit={handleSubmit}>
            <h2 className="hotel-application-title">
              <i className="fa fa-building"></i> Register A Hotel
            </h2>
            
            {error && <div className="error">{error}</div>}
            
            <div className="hotel-application-form-group">
              <label htmlFor="hotelName" className="hotel-application-label">
                Hotel Name
              </label>
              <input
                type="text"
                id="hotelName"
                className="hotel-application-input"
                placeholder="Enter hotel name"
                required
                value={formData.hotelName}
                onChange={handleChange}
              />
            </div>
            
            <div className="hotel-application-form-row">
              <div className="hotel-application-form-group">
                <label htmlFor="email" className="hotel-application-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="hotel-application-input"
                  placeholder="Enter email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="hotel-application-form-group">
                <label htmlFor="phone" className="hotel-application-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="hotel-application-input"
                  placeholder="Enter phone number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="hotel-application-form-group">
                <label htmlFor="password" className="hotel-application-label">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  className="hotel-application-input"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="hotel-application-form-row">
              <div className="hotel-application-form-group">
                <label htmlFor="address" className="hotel-application-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="hotel-application-input"
                  placeholder="Enter street address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="hotel-application-form-group">
                <label htmlFor="city" className="hotel-application-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="hotel-application-input"
                  placeholder="Enter city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="hotel-application-form-group">
              <label htmlFor="description" className="hotel-application-label">
                Hotel Description
              </label>
              <textarea
                id="description"
                className="hotel-application-textarea"
                placeholder="Brief description of your hotel"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="hotel-application-form-group">
              <label htmlFor="amenities" className="hotel-application-label">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                id="amenities"
                className="hotel-application-input"
                placeholder="e.g., Pool, Gym, Spa, WiFi"
                value={formData.amenities}
                onChange={handleChange}
              />
            </div>
            
            <div className="hotel-application-form-actions">
              <button
                type="button"
                className="hotel-application-cancel-btn"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hotel-application-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Hotel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HotelRegistration;