import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomCategoryForm from './RoomCategoryForm';
import { getCurrentHotel, deleteRoom } from '../../../api/hotel/hotelApi';
import './ManageRooms.css';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // handle delete funcltion

  const handleDeleteRoom = async (roomId) => {
    if(!window.confirm('Are you sure you want to delete this room?')){
      return;
    }

    try{
      setIsLoading(true);
      const response = await deleteRoom(roomId);

      if(response.success) {
        // update the rooms state by filtering out the deleted room
setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId));
      }
    }catch(err){
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await getCurrentHotel();
        if (response.success && response.hotel.rooms) {
          setRooms(response.hotel.rooms);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHotelData();
  }, []);

  const handleAddRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
  };

  if (isLoading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="hoteldash-rooms">
      <div className="hoteldash-rooms-header">
        <h2>Manage Rooms</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          Add New Room
        </button>
      </div>

      {showForm && (
        <RoomCategoryForm 
          onClose={() => setShowForm(false)}
          onSave={handleAddRoom}
        />
      )}

      <div className="hoteldash-room-types fade-up">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="hoteldash-room-card">
              {room.images?.length > 0 ? (
                <img 
                  src={`http://localhost:5000/${room.images[0]}`} 
                  alt={`${room.roomType} room`}
                  onError={(e) => {
                    e.target.src = '/default-room.jpg'; // Fallback image
                  }}
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <h3>{room.roomType} - {room.roomNumber}</h3>
              <span>{room.description}</span>
              <div className="hoteldash-room-details">
                <span>Price: ${room.pricePerNight}/night</span>
                <span>Capacity: {room.capacity}</span>
                <span>Status: {room.isAvailable ? 'Available' : 'Booked'}</span>
              </div>
              <div className="hoteldash-room-actions">
                <button className="edit btn btn-primary">
                  <i className="fa fa-edit"></i> Edit
                </button>
                <button 
                className="delete btn btn-danger"
                onClick={() => handleDeleteRoom(room._id)}
                disabled={isLoading}
                >
                  <i className="fa fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms added yet. Add your first room!</p>
        )}
      </div>
    </div>
  );
};

export default ManageRooms;