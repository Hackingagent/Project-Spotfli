// components/home/listings/hotel/Hotel.jsx
import React, { useState, useEffect } from 'react';
import { getAllHotels } from '../../../../api/hotel/hotelApi';
import HotelComponent from './HotelComponent';
import './css/Hotel.css'; // We'll create this for styling
import Loader from '../../../common/Loader.jsx';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await getAllHotels();
                if (response.success) {
                    setHotels(response.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="hotel-listing-section">
            <h2 className='section-title'>
                Hotels in your area <i className="fa fa-hotel"></i>
            </h2>
            <div className="hotel-listings-container">
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <HotelComponent
                            key={hotel._id}
                            id={hotel._id}
                            name={hotel.hotelName}
                            images={hotel.images}
                            city={hotel.city}
                            description={hotel.description}
                            rating={hotel.ratings?.average || 0}
                            ratingCount={hotel.ratings?.count || 0}
                            starRating={hotel.starRating}
                            rooms={hotel.rooms}
                        />
                    ))
                ) : (
                    <div className="no-hotels">
                        <p>No hotels available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hotel;