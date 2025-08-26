// components/home/listings/hotel/HotelComponent.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hotelImagePlaceholder from '../../../../assets/hoteldefault.avif'; // Assuming you have a placeholder image
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';


const HotelComponent = ({ id, name, images, city, description, rating, ratingCount, starRating, rooms }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Get the lowest room price
    const lowestPrice = rooms?.reduce((min, room) => 
        room.pricePerNight < min ? room.pricePerNight : min, 
        rooms[0]?.pricePerNight || 0
    );

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next)
    };

    return (
        <div className="hotel-card">
            <div className="hotel-image-slider">
                {images?.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {images.map((image, index) => (
                            <div key={index} className="hotel-slide">
                                <img 
                                    src={`${import.meta.env.VITE_FILE_API_URL}/${image}`} 
                                    alt={`${name} - ${index + 1}`}
                                    onError={(e) => {
                                        e.target.src = '/default-hotel.jpg';
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="no-image">
                        <img src={hotelImagePlaceholder} alt="Default hotel" />
                    </div>
                )}
            </div>

            <div className="hotel-info">
                <div className="hotel-header">
                    <h3 className="hotel-name">{name}</h3>
                    {starRating && (
                        <div className="star-rating">
                            {[...Array(starRating)].map((_, i) => (
                                <FaStar key={i} className="star-icon" />
                            ))}
                        </div>
                    )}
                </div>

                <div className="hotel-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{city}</span>
                </div>

                <p className="hotel-description">
                    {description?.length > 100 
                        ? `${description.substring(0, 100)}...` 
                        : description}
                </p>

                <div className="hotel-footer">
                    <div className="hotel-rating">
                        <div className="rating-badge">
                            {rating > 0 ? rating.toFixed(1) : 'NR'}
                        </div>
                        <span className="rating-text">
                            {rating > 0 
                                ? `${ratingCount} review${ratingCount !== 1 ? 's' : ''}` 
                                : 'Not rated yet'}
                        </span>
                    </div>

                    {lowestPrice > 0 && (
                        <div className="hotel-price">
                            <span className="price-from">From</span>
                            <span className="price-amount">XAF {lowestPrice.toLocaleString()}</span>
                            <span className="price-night">/ night</span>
                        </div>
                    )}
                </div>

                <Link to={`/hotel/${id}`} className="view-hotel-btn">
                    View Hotel
                </Link>
            </div>
        </div>
    );
};

export default HotelComponent;