// src/components/hotel/HotelGallery.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/HotelGallery.css';

const HotelGallery = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    return (
        <div className="hotel-gallery">
            {images?.length > 0 ? (
                <>
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index} className="gallery-slide">
                                <img 
                                    src={`${import.meta.env.VITE_FILE_API_URL}/${image}`} 
                                    alt={`Hotel view ${index + 1}`}
                                    onError={(e) => {
                                        e.target.src = '/default-hotel.jpg';
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                    <div className="gallery-counter">
                        {currentSlide + 1} / {images.length}
                    </div>
                </>
            ) : (
                <div className="no-images">
                    <img src="/default-hotel.jpg" alt="Default hotel view" />
                </div>
            )}
        </div>
    );
};

export default HotelGallery;