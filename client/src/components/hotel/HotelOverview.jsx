import { useState, useEffect } from 'react';
import loader from '../../assets/preloadoers/Main Scene.gif';
import { getHotelOverview } from '../../api/hotel/hotelApi';
import './HotelOverview.css';

const HotelOverview = () => {
  const [hotelData, setHotelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHotelOverview();
        if (response.success) {
          setHotelData(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) return <div className='preloader'><img src={loader} alt="" /></div>;
  if (error) return <div className="error-overview">Error: {error}</div>;

  return (
    <div className="hotel-overview-container">
      <h2 className="overview-header">{hotelData?.hotelName || 'Hotel'} Overview</h2>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total-rooms">
          <h3>Total Rooms</h3>
          <p>{hotelData?.totalRooms || 0}</p>
        </div>
        
        <div className="stat-card available-rooms">
          <h3>Available</h3>
          <p>{hotelData?.availableRooms || 0}</p>
          {hotelData?.availableRooms === 0 && <span className="no-data">No rooms available</span>}
        </div>
        
        <div className="stat-card occupied-rooms">
          <h3>Occupied</h3>
          <p>{hotelData?.occupiedRooms || 0}</p>
          {hotelData?.occupiedRooms === 0 && <span className="no-data">No rooms occupied</span>}
        </div>
        
        <div className="stat-card reserved-rooms">
          <h3>Reserved</h3>
          <p>{hotelData?.reservedRooms || 0}</p>
          {hotelData?.reservedRooms === 0 && <span className="no-data">No rooms reserved</span>}
        </div>
      </div>

      {/* Hotel Description */}
      <div className="description-section">
        <h3>About Our Hotel</h3>
        <p>{hotelData?.description || 'No description provided'}</p>
      </div>

      {/* Hotel Images */}
      <div className="gallery-section">
        <h3>Hotel Gallery</h3>
        {hotelData?.images?.length > 0 ? (
          <div className="image-gallery">
            {hotelData.images.map((image, index) => (
              <div key={index} className="gallery-image">
                <img 
                  src={`http://localhost:5000/${image}`} 
                  alt={`Hotel view ${index + 1}`}
                  onError={(e) => {
                    e.target.src = '/default-hotel.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-images">No images available</div>
        )}
      </div>
    </div>
  );
};

export default HotelOverview;