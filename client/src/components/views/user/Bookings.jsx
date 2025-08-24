// src/components/user/Bookings.jsx
import React, { useState, useEffect } from 'react';
import { getUserBookings, cancelUserBooking } from '../../../api/booking';
import './css/Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getUserBookings();
                if (response.success) {
                    setBookings(response.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async (hotelId, roomId, bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await cancelUserBooking(hotelId, roomId, bookingId);
            
            if (response.success) {
                setBookings(prev => prev.filter(
                    booking => booking._id !== bookingId
                ));
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading your bookings...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="bookings-container">
            <h1>My Bookings</h1>
            
            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <p>You don't have any bookings yet.</p>
                </div>
            ) : (
                <div className="bookings-list">
                    {bookings.map(booking => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-header">
                                <h2>{booking.hotel.name}</h2>
                                <span className={`status-badge ${booking.status}`}>
                                    {booking.status}
                                </span>
                            </div>
                            
                            <div className="booking-details">
                                <div className="detail-group">
                                    <h3>Room Details</h3>
                                    <p>{booking.room.type} Room - {booking.room.number}</p>
                                    <p>{booking.room.pricePerNight.toLocaleString()} XAF per night</p>
                                </div>
                                
                                <div className="detail-group">
                                    <h3>Dates</h3>
                                    <p>
                                        {new Date(booking.checkInDate).toLocaleDateString()} - 
                                        {new Date(booking.checkOutDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        {Math.ceil(
                                            (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / 
                                            (1000 * 60 * 60 * 24)
                                        )} nights
                                    </p>
                                </div>
                                
                                <div className="detail-group">
                                    <h3>Total Price</h3>
                                    <p className="total-price">
                                        {booking.totalPrice.toLocaleString()} XAF
                                    </p>
                                </div>
                            </div>
                            
                            <div className="booking-actions">
                                {booking.status === 'confirmed' && (
                                    <button
                                        className="cancel-btn"
                                        onClick={() => handleCancelBooking(
                                            booking.hotel._id,
                                            booking.room._id,
                                            booking._id
                                        )}
                                        disabled={loading}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;