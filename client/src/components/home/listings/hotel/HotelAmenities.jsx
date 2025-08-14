// src/components/hotel/HotelAmenities.jsx
import React from 'react';
import './css/HotelAmenities.css';

const HotelAmenities = ({ amenities }) => {
    return (
        <div className="hotel-amenities">
            <h2>Amenities</h2>
            {amenities?.length > 0 ? (
                <div className="amenities-grid">
                    {amenities.map((amenity, index) => (
                        <div key={index} className="amenity-item">
                            <span className="amenity-icon">
                                {/* You can add specific icons based on amenity type */}
                                <i className="fa fa-check"></i>
                            </span>
                            <span className="amenity-name">{amenity}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No amenities listed for this hotel.</p>
            )}
        </div>
    );
};

export default HotelAmenities;