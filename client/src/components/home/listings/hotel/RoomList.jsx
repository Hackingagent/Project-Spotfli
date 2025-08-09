// src/components/hotel/RoomList.jsx
import React from 'react';
import './css/RoomList.css';

const RoomList = ({ rooms, onSelectRoom }) => {
    return (
        <div className="room-list">
            {rooms.length > 0 ? (
                rooms.map((room) => (
                    <div 
                        key={room._id} 
                        className="room-card"
                        onClick={() => onSelectRoom(room)}
                    >
                        <div className="room-image">
                            {room.images?.length > 0 ? (
                                <img 
                                    src={`http://localhost:5000/${room.images[0]}`} 
                                    alt={room.roomType}
                                    onError={(e) => {
                                        e.target.src = '/default-room.jpg';
                                    }}
                                />
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
                ))
            ) : (
                <div className="no-rooms">
                    No rooms available at this hotel.
                </div>
            )}
        </div>
    );
};

export default RoomList;