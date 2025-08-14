// components/hotel/HotelDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelDetails } from '../../../../api/hotel/hotelApi';
import Loader from '../../../common/Loader.jsx';
import RoomList from './RoomList';
import HotelGallery from './HotelGallery';
import HotelAmenities from './HotelAmenities';
import BookingForm from './BookingForm';
import './css/HotelDetailsPage.css';

const HotelDetailsPage = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await getHotelDetails(id);
                if (response.success) {
                    setHotel(response.data);
                } else {
                    setError('Hotel not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="error-container">{error}</div>;
    if (!hotel) return <div className="not-found">Hotel not found</div>;

    return (
        <div className="hotel-details-container">
            <div className="hotel-header">
                <h1>{hotel.hotelName}</h1>
                <div className="hotel-location">
                    <span>{hotel.address}, {hotel.city}</span>
                </div>
                {hotel.starRating && (
                    <div className="star-rating">
                        {[...Array(hotel.starRating)].map((_, i) => (
                            <span key={i} className="star">★</span>
                        ))}
                    </div>
                )}
            </div>

            <HotelGallery images={hotel.images} />

            <div className="hotel-content">
                <div className="hotel-main">
                    <div className="hotel-description">
                        <h2>About {hotel.hotelName}</h2>
                        <p>{hotel.description}</p>
                    </div>

                    <div className="hotel-rooms">
                        <h2>Rooms & Rates</h2>
                        <RoomList 
                            rooms={hotel.rooms} 
                            onSelectRoom={setSelectedRoom} 
                        />
                    </div>

                    <HotelAmenities amenities={hotel.amenities} />
                </div>

                <div className="hotel-sidebar">
                    {selectedRoom ? (
                        <BookingForm 
                            hotelId={hotel._id}
                            room={selectedRoom}
                            priceRange={hotel.priceRange}
                        />
                    ) : (
                        <div className="booking-placeholder">
                            <p>Select a room to see rates and availability</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsPage;