import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PropertyRoomsList.module.css';
import { getPropertyRooms, UpdatePropertyRoom } from '../../../../api/user/property/property';
import ViewPropertyRoomModal from '../modal/ViewPropertyRoomModal';
import Notification from '../../../notification/notification';
import RoomBookingModal from '../modal/RoomBookingsModal';

const PropertyRoomsList = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [message, setMessage] = useState('');
  const [showBookingsModal, setShowBookingsModal] = useState(false);


  const fetchRooms = async () => {
    try {
      const response = await getPropertyRooms(id);
      setRooms(response.propertyRooms);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchRooms();
  }, []);


  const handleUpdatePropertyRoom = async (formData) => {
    console.log('User section id: ', currentRoom._id);
    console.log('User section Form Data: ', formData);
    const response = await UpdatePropertyRoom(formData, currentRoom._id);
    setMessage(response.message);
    fetchRooms();
  }


  

  // Component for individual room with image carousel
  const RoomCard = ({ room }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
      setCurrentImageIndex(prev => 
        prev === room.files.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setCurrentImageIndex(prev => 
        prev === 0 ? room.files.length - 1 : prev - 1
      );
    };

    return (
      <div className={styles.roomCard}>
        <div className={styles.roomImageContainer}>
          {room.files.length > 0 && (
            <>
              <img 
                src={`${import.meta.env.VITE_FILE_API_URL}${room.files[currentImageIndex].url}`} 
                alt={`Room ${currentImageIndex + 1}`}
                className={styles.roomImage}
              />
              {room.files.length > 1 && (
                <>
                  <button 
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevImage}
                  >
                    &lt;
                  </button>
                  <button 
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextImage}
                  >
                    &gt;
                  </button>
                  <div className={styles.imageCounter}>
                    {currentImageIndex + 1}/{room.files.length}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className={styles.roomDetails}>
          <h3>{room.roomType}</h3>
          <p>Price: XAF {room.price.toLocaleString()}</p>
          <p>Available: {room.quantityAvailable}</p>
          <div className={styles.amenities}>
            {room.amenities.map((amenity, i) => (
              <span key={i} className={styles.amenityTag}>{amenity}</span>
            ))}
          </div>
          <div className={styles.buttons}>
            <button 
              className={styles.viewButton} 
              onClick={() => {
                setShowViewModal(true);
                setCurrentRoom(room);
              }}
            >
              View Details
            </button>

            <button
              className={styles.manageButton}
              onClick={()=>{
                setShowBookingsModal(true);
                setCurrentRoom(room)
              }}
            >
              Manage Bookings
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>

      {message && (
        <Notification 
          message={message}
          noMessage={() => setMessage('')}
          type='success'
        />

      )}
      {showViewModal && (
        <ViewPropertyRoomModal 
          room={currentRoom}
          onSubmit={handleUpdatePropertyRoom}
          onClose={() => setShowViewModal(false)}
        />

      )}

      { showBookingsModal && (
        <RoomBookingModal 
          
        />
      )}


      <div className={styles.roomsContainer}>
        <h2>Available Rooms</h2>
        <div className={styles.roomsGrid}>
          {rooms.map(room => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>

    </>
  );
};

export default PropertyRoomsList;