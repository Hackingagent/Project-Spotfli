import React, { useEffect, useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaStar, FaHeart, FaShare, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './property-details.css';
import PropertyBookingModal from '../book/PropertyBookingModal';
import { getSingleProperty } from '../../api/user/property/property';
import { useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import RentRoomList from '../home/listings/rent/RentRoomList';
import RentBookingForm from '../home/listings/rent/RentBookingForm';

const PropertyDetails = ({  onClose }) => {
  
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookProperty, isBookProperty] = useState(false);
  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState('false');
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchProperty = async() => {
      try {
        setIsLoading(true)

        const response = await getSingleProperty(id);

        console.log('Property: ', response);

        setProperty(response.property);

      } catch (error) {
        setError(error.message);
      }finally{
        setIsLoading(false)
      }
    }

    fetchProperty();
  }, [id]);

  function showBookModal (){
      // setSelectedService(service);
      isBookProperty(!bookProperty);
  }

  // Sample property data structure
  // const sampleProperty = {
  //   id: 1,
  //   title: "Modern Luxury Apartment in Downtown",
  //   price: "$1,200/month",
  //   address: "123 Main Street, Downtown, City",
  //   type: "Apartment",
  //   bedrooms: 3,
  //   bathrooms: 2,
  //   area: 1200,
  //   rating: 4.8,
  //   likes: 124,
  //   description: "This stunning modern apartment offers luxurious living in the heart of downtown. With spacious rooms, high-end finishes, and amazing views, this is the perfect place to call home.",
  //   amenities: [
  //     "Parking Space",
  //     "Free WiFi",
  //     "Security Guard",
  //     "Backup Generator",
  //     "Swimming Pool",
  //     "Fitness Center",
  //     "24/7 Water Supply"
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  //     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  //     "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  //     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  //   ],
  //   publisher: {
  //     name: "Sarah Johnson",
  //     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  //     joined: "Member since 2018",
  //     verified: true
  //   }
  // };

  // Use the passed property or sample data
  // const currentProperty =  property;

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.files.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.files.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;



  return (
    <>
    {bookProperty && <PropertyBookingModal showBookModal={showBookModal} />}
      <div className="property-details-container">
      {/* Close button (optional) */}
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      )}

      {/* Property Header */}
      <div className="property-header">
        <h1>{property.data.name}</h1>
        {/* <div className="property-price">{property.price}</div> */}
        <div className="property-location">
          <FaMapMarkerAlt /> {property.data.location}
        </div>
      </div>

      {/* Image Gallery - Grid on desktop, Slider on mobile */}
      <div className="property-images">
        {/* Desktop Grid View */}
        <div className="desktop-grid">
          {property.files.map((img, index) => (
            <div 
              key={index} 
              className={`grid-item ${index === 0 ? 'main-image' : ''}`}
              style={{ backgroundImage: `url(${import.meta.env.VITE_FILE_API_URL}${img.url})` }}
            ></div>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="mobile-slider">
          <div 
            className="slider-image"
            style={{ backgroundImage: `url(${import.meta.env.VITE_FILE_API_URL}${property.files[currentImageIndex].url})` }}
          >import RentBookingForm from '../home/listings/rent/RentBookingForm';

            <button className="slider-nav prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="slider-nav next" onClick={nextImage}>
              <FaChevronRight />
            </button>
            <div className="slider-dots">
              {property.files.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Publisher Info */}
      <div className="publisher-section">
        <div className="publisher-avatar">
          <img src={property.userDetails.avatar} alt={property.userDetails.first_name} />
          {property.userDetails.verified && <span className="verified-badge">✓</span>}
        </div>
        <div className="publisher-info">
          <h3>{property.userDetails.first_name} {property.userDetails.last_name}</h3>
          <p>{property.userDetails.joined}</p>
        </div>
        <button className="contact-btn">Contact</button>
      </div>

      {/* Property Details */}
      <div className="property-details-section">
        <h2>Property Details</h2>
        <div className="details-grid">
          <div className="detail-item">
            <FaBed className="detail-icon" />
            <span>{property.data?.floors} Floors</span>
          </div>
          <div className="detail-item">
            <FaBath className="detail-icon" />
            <span>{property.data?.rooms} Apartment</span>
          </div>
          <div className="detail-item">
            <FaRulerCombined className="detail-icon" />
            <span>{property.area} sq ft</span>
          </div>
          <div className="detail-item">
            <FaStar className="detail-icon" />
            <span>{property.rating} Rating ({property.likes} likes)</span>
          </div>
        </div>
      </div>

      <div className="hotel-content">
        <div className="hotel-main">

            <div className="hotel-rooms">
                <h2>Apartments & Rates</h2>
                <RentRoomList 
                    rooms={property.rooms} 
                    onSelectRoom={setSelectedRoom} 
                />
            </div>

            {/* <HotelAmenities amenities={hotel.amenities} /> */}
        </div>

        <div className="hotel-sidebar">
            {selectedRoom ? (
                <RentBookingForm 
                    hotelId={property._id}
                    room={selectedRoom}
                    priceRange={property.priceRange}
                />
            ) : (
                <div className="booking-placeholder">
                    <p>Select an apartment to see rates and availability</p>
                </div>
            )}
        </div>
    </div>

      {/* Description */}
      {property.data.description && (
        <div className="description-section">
          <h2>Description</h2>
          <p>{property.data.description}</p>
        </div>
      )}

      {/* Amenities */}
      {property.data.special_amenities && (
        <div className="amenities-section">
          <h2>Special Amenities</h2>
          <div className="amenities-grid">
            {property.data.special_amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-bullet">•</span> {amenity}
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="like-btn">
          <FaHeart /> Like
        </button>
        <button className="share-btn">
          <FaShare /> Share
        </button>
        {/* <button onClick={isBookProperty} className="book-btn">
          Book Now
        </button> */}
      </div>
    </div>
    </>
  );
};

export default PropertyDetails;