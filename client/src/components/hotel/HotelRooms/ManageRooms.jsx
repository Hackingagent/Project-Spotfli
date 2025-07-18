import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomCategoryForm from './RoomCategoryForm';
import hroom from '../../../assets/properties/house1.jpg'
import './ManageRooms.css';

const ManageRooms = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch room types from API
    const fetchRoomTypes = async () => {
      // Replace with actual API call
      setRoomTypes([
        {
          id: 1,
          image: hroom,
          name: 'Deluxe Room',
          description: 'Spacious room with king bed',
          price: 200,
          capacity: 2,
          amenities: ['WiFi', 'TV', 'AC'],
          totalRooms: 10,
          availableRooms: 5
        },
        // More room types...
      ]);
    };
    fetchRoomTypes();
  }, []);

  return (
    <div className="hoteldash-rooms">
      <div className="hoteldash-rooms-header">
        <h2>Manage Room Types</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          Add New Room Type
        </button>
      </div>

      {showForm && (
        <RoomCategoryForm 
          onClose={() => setShowForm(false)}
          onSave={(newRoomType) => {
            setRoomTypes([...roomTypes, newRoomType]);
            setShowForm(false);
          }}
        />
      )}

      <div className="hoteldash-room-types">
        {roomTypes.map((room) => (
          <div key={room.id} className="hoteldash-room-card">
            <img src={hroom} alt="" />
            <h3>{room.name}</h3>
            <span>{room.description}</span>
            <div className="hoteldash-room-details">
              <span>Price: ${room.price}/night</span>
              <span>Capacity: {room.capacity}</span>
              <span>Available: {room.availableRooms}/{room.totalRooms}</span>
            </div>
            <div className="hoteldash-room-actions">
              <Link to={`/hotel/rooms/${room.id}`} className="edit btn btn-primary">
               <i className="fa fa-edit"></i> Edit
              </Link>
              <Link to={`/hotel/rooms/${room.id}`} className="delete btn btn-primary">
               <i className="fa fa-trash"></i> Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;