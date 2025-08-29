// src/components/hotel/RoomList.jsx
import React, { useState } from 'react';
import './css/RoomList.css';

const RoomList = ({ rooms, onSelectRoom }) => {
    return (
        <div className="room-list">
            {rooms.length > 0 ? (
                rooms.map((room) => (
                    <RoomCard 
                        key={room._id} 
                        room={room} 
                        onSelectRoom={onSelectRoom}
                    />
                ))
            ) : (
                <div className="no-rooms">
                    No rooms available at this hotel.
                </div>
            )}
        </div>
    );
};

// Separate RoomCard component to handle individual room display
const RoomCard = ({ room, onSelectRoom }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e.stopPropagation(); // Prevent triggering the room selection
        setCurrentImageIndex((prevIndex) => 
            prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = (e) => {
        e.stopPropagation(); // Prevent triggering the room selection
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div 
            className="room-card"
            onClick={() => onSelectRoom(room)}
        >
            <div className="room-image-slider">
                {room.images?.length > 0 ? (
                    <>
                        <img 
                            src={`${import.meta.env.VITE_FILE_API_URL}/${room.images[currentImageIndex]}`} 
                            alt={`${room.roomType} - Image ${currentImageIndex + 1}`}
                            onError={(e) => {
                                e.target.src = '/default-room.jpg';
                            }}
                        />
                        
                        {/* Navigation arrows */}
                        {room.images.length > 1 && (
                            <>
                                <button 
                                    className="slider-arrow slider-arrow-left"
                                    onClick={prevImage}
                                    aria-label="Previous image"
                                >
                                    &#8249;
                                </button>
                                <button 
                                    className="slider-arrow slider-arrow-right"
                                    onClick={nextImage}
                                    aria-label="Next image"
                                >
                                    &#8250;
                                </button>
                            </>
                        )}
                        
                        {/* Image indicator dots */}
                        {room.images.length > 1 && (
                            <div className="image-indicators">
                                {room.images.map((_, index) => (
                                    <span 
                                        key={index}
                                        className={`indicator-dot ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <img src="/default-room.jpg" alt="Default room" />
                )}
            </div>
            <div className="room-details">
                <h3>{room.roomType} Room - {room.roomNumber}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-amenities">
                    {room.amenities?.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="amenity-tag">
                            {amenity}
                        </span>
                    ))}
                    {room.amenities?.length > 3 && (
                        <span className="amenity-more">
                            +{room.amenities.length - 3} more
                        </span>
                    )}
                </div>
                <div className="room-capacity">
                    <span>Capacity: {room.capacity} person(s)</span>
                </div>
            </div>
            <div className="room-price">
                <div className="price-amount">
                    XAF {room.pricePerNight.toLocaleString()}
                </div>
                <div className="price-night">per night</div>
                <div className="room-status">
                    {room.isAvailable ? (
                        <span className="available">Available</span>
                    ) : (
                        <span className="unavailable">Booked</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomList;