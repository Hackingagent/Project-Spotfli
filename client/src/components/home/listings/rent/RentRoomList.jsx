// src/components/hotel/RoomList.jsx
import React from 'react';
import ImageGallery from './gallery/image-gallery';
// import './css/RoomList.css';

const RentRoomList = ({ rooms, onSelectRoom }) => {

  
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

                            <ImageGallery
                                room= {room}
                            />
                            
                        </div>
                        <div className="room-details">
                            <h3>{room.roomType}  </h3>
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
                                <span>{room.quantityAvailable} Available</span>
                            </div>
                        </div>
                        <div className="room-price">
                            <div className="price-amount">
                                XAF {room.price.toLocaleString()}
                            </div>
                            <div className="price-night">per month</div>
                            {/* <div className="room-status">
                                {room.isAvailable ? (
                                    <span className="available">Available</span>
                                ) : (
                                    <span className="unavailable">Booked</span>
                                )}
                            </div> */}
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

export default RentRoomList;