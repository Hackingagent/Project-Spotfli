// src/components/hotel/BookingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookPropertyRoom } from '../../../../api/user/property/property';
// import './css/BookingForm.css';
import Payment from '../../../payments/Payment';

const RentBookingForm = ({ propertyId, room }) => {
    const [formData, setFormData] = useState({
        checkInMonth: '',
        number: '',
        specialRequests: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await bookPropertyRoom(propertyId, room._id, formData);
            
            if (response.success) {
                // Redirect to bookings page or show success message
                // navigate('/user/bookings', { 
                //     state: { 
                //         bookingSuccess: true,
                //         bookingId: response.booking._id 
                //     } 
                // });

                alert('Booking Create successfully');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Payment />
            <div className="booking-form-container">
                <h3>Book {room.roomType}</h3>
                <div className="booking-price">
                    XAF {room.price.toLocaleString()} <span>per Month</span>
                </div>
                <small  >XAF {room.price * 12} <span>per year</span></small>

                
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{marginTop: '10px'}}>
                        <label>Check In Month</label>
                        <select
                            // type="date"
                            name="checkInMonth"
                            value={formData.checkInMonth}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                        >

                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>

                    </div>

                    <div className="form-group">
                        <label>Number of people</label>
                        <input
                            type="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                            min={1}
                        />
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
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button 
                        type="submit" 
                        className="book-now-btn"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Book Now'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default RentBookingForm;