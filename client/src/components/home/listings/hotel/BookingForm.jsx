// src/components/hotel/BookingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../../../api/booking';
import './css/BookingForm.css';
import Payment from '../../../payments/Payment';
import axios from 'axios';

const BookingForm = ({ hotelId, room }) => {
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
        specialRequests: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentModal, setPaymentModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const commissionSplit = async(amount) => {
        try {
            const commission = Math.floor(0.65 * amount); // Always rounds down
            console.log("Commission:",commission);

            const data = JSON.stringify({
                amount: commission.toString(),
                to: '237683523840',
                description: "Booking Fee Commission",
                external_reference: ""
            });
    
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://demo.campay.net/api/withdraw/',
                headers: {
                    'Authorization': `Token ${import.meta.env.VITE_PAYMENT_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios(config);

        } catch (error) {
            console.log('Error: ', error.message);
        }
    }

    const handleSubmit = async () => {
        // e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            console.log('Hotel ID', hotelId);
            const response = await createBooking(hotelId, room._id, formData);
            
            if (response.success) {
                // Redirect to bookings page or show success message
                navigate('/user/bookings', { 
                    state: { 
                        bookingSuccess: true,
                        bookingId: response.booking._id 
                    } 
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total price preview
    const calculateTotal = () => {
        if (formData.checkInDate && formData.checkOutDate) {
            const checkIn = new Date(formData.checkInDate);
            const checkOut = new Date(formData.checkOutDate);
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            return nights * room.pricePerNight;
        }
        return 0;
    };

    return (
        <>
        {paymentModal && <Payment
             onClose={() => setPaymentModal(false)}
             amount={5}
             handleSubmit={handleSubmit}
             handleCommission={commissionSplit}
        />}
        <div className="hotels-booking-form-modal">
         <div className="booking-form-container">
            <h3>Book {room.roomType} Room</h3>
            <div className="booking-price">
                XAF {room.pricePerNight.toLocaleString()} <span>per night</span>
            </div>
            
            <form>
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

                {formData.checkInDate && formData.checkOutDate && (
                    <div className="price-summary">
                        <div className="price-line">
                            <span>{room.pricePerNight.toLocaleString()} XAF × </span>
                            <span>{Math.ceil(
                                (new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / 
                                (1000 * 60 * 60 * 24)
                            )} nights</span>
                        </div>
                        <div className="total-price">
                            <span>Total:</span>
                            <span>{calculateTotal().toLocaleString()} XAF</span>
                        </div>
                    </div>
                )}
                
                {error && <div className="error-message">{error}</div>}
                
                <button 
                    type="submit" 
                    className="book-now-btn"
                    disabled={loading || formData.checkInDate == '' || formData.checkOutDate == ''}
                    onClick={(e) => {
                        e.preventDefault();
                        setPaymentModal(true);
                    }}
                >
                    {loading ? 'Processing...' : 'Book Now'}
                </button>
            </form>
        </div>
        </div>
        </>
    );
};

export default BookingForm;