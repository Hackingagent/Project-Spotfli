import React, { useState } from "react";
import './HotelRegistration.css';
const EditHotel = ({ onClose }) => {

    return(
        <div className="hotel-application-overlay">
            <div className="hotel-application-modal">
              <div className="hotel-application-form-container">
                <h2><i className="fa fa-edit"></i> Edit Hotel</h2>
                    <button className="hotel-application-close-btn" onClick={onClose}>
                        &times;
                    </button>
                <form action="">
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
            
            <div className="hotel-application-form-group">
              <label htmlFor="amenities" className="hotel-application-label">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                id="amenities"
                className="hotel-application-input"
                placeholder="e.g., Pool, Gym, Spa, WiFi"
              />
            </div>
            <div className="hotel-application-form-actions">
                <button
                type="button"
                className="hotel-application-cancel-btn"
                onClick={onClose}
                  >Cancel
                </button>

                <button
                type="submit"
                className="hotel-application-submit-btn">
                    Edit
                </button>
            </div>
            
                </form>
              </div>
            </div>
        </div>
    )
}
export default EditHotel