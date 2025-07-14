import React from 'react';
import './HotelRegistration.css';

const HotelRegistration = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    onClose();
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
              ></textarea>
            </div>
        
            
            <div className="hotel-application-form-actions">
              <button
                type="button"
                className="hotel-application-cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hotel-application-submit-btn"
              >
                Register Hotel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HotelRegistration;