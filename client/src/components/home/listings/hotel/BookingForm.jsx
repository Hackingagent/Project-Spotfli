// src/components/hotel/BookingForm.jsx
import React, { useState } from 'react';
import './css/BookingForm.css';

const BookingForm = ({ hotelId, room }) => {
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
        specialRequests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement booking logic
        console.log('Booking submitted:', { hotelId, room, ...formData });
    };

    return (
        <div className="booking-form-container">
            <h3>Book {room.roomType} Room</h3>
            <div className="booking-price">
                XAF {room.pricePerNight.toLocaleString()} <span>per night</span>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Check-in Date</label>
                    <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                
                <div className="form-group">
                    <label>Check-out Date</label>
                    <input
                        type="date"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        required
                        min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                    />
                </div>
                
                <div className="form-group">
                    <label>Number of Guests</label>
                    <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                    >
                        {[...Array(room.capacity).keys()].map(num => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Special Requests</label>
                    <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Any special requirements?"
                    />
                </div>
                
                <button type="submit" className="book-now-btn">
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;