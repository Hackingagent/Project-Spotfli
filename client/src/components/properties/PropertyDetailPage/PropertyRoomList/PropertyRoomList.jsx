import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PropertyRoomsList.module.css';
import { getPropertyRooms } from '../../../../api/user/property/property';

const PropertyRoomsList = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchRooms();
  }, [id]);

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
                src={`http://localhost:5000${room.files[currentImageIndex].url}`} 
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
          <button className={styles.viewButton}>View Details</button>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.roomsContainer}>
      <h2>Available Rooms</h2>
      <div className={styles.roomsGrid}>
        {rooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default PropertyRoomsList;