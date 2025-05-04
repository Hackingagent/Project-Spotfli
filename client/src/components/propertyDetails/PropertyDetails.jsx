import React, { useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaStar, FaHeart, FaShare, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './property-details.css';
import PropertyBookingModal from '../book/PropertyBookingModal';

const PropertyDetails = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookProperty, isBookProperty] = useState(false);
  // const [selectedService, setSelectedService] = useState(null);
  function showBookModal (){
      // setSelectedService(service);
      isBookProperty(!bookProperty);
  }

  // Sample property data structure
  const sampleProperty = {
    id: 1,
    title: "Modern Luxury Apartment in Downtown",
    price: "$1,200/month",
    address: "123 Main Street, Downtown, City",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    rating: 4.8,
    likes: 124,
    description: "This stunning modern apartment offers luxurious living in the heart of downtown. With spacious rooms, high-end finishes, and amazing views, this is the perfect place to call home.",
    amenities: [
      "Parking Space",
      "Free WiFi",
      "Security Guard",
      "Backup Generator",
      "Swimming Pool",
      "Fitness Center",
      "24/7 Water Supply"
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    publisher: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      joined: "Member since 2018",
      verified: true
    }
  };

  // Use the passed property or sample data
  const currentProperty = property || sampleProperty;

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === currentProperty.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? currentProperty.images.length - 1 : prevIndex - 1
    );
  };

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
        <h1>{currentProperty.title}</h1>
        <div className="property-price">{currentProperty.price}</div>
        <div className="property-location">
          <FaMapMarkerAlt /> {currentProperty.address}
        </div>
      </div>

      {/* Image Gallery - Grid on desktop, Slider on mobile */}
      <div className="property-images">
        {/* Desktop Grid View */}
        <div className="desktop-grid">
          {currentProperty.images.map((img, index) => (
            <div 
              key={index} 
              className={`grid-item ${index === 0 ? 'main-image' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="mobile-slider">
          <div 
            className="slider-image"
            style={{ backgroundImage: `url(${currentProperty.images[currentImageIndex]})` }}
          >
            <button className="slider-nav prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="slider-nav next" onClick={nextImage}>
              <FaChevronRight />
            </button>
            <div className="slider-dots">
              {currentProperty.images.map((_, index) => (
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
          <img src={currentProperty.publisher.avatar} alt={currentProperty.publisher.name} />
          {currentProperty.publisher.verified && <span className="verified-badge">✓</span>}
        </div>
        <div className="publisher-info">
          <h3>{currentProperty.publisher.name}</h3>
          <p>{currentProperty.publisher.joined}</p>
        </div>
        <button className="contact-btn">Contact</button>
      </div>

      {/* Property Details */}
      <div className="property-details-section">
        <h2>Property Details</h2>
        <div className="details-grid">
          <div className="detail-item">
            <FaBed className="detail-icon" />
            <span>{currentProperty.bedrooms} Bedrooms</span>
          </div>
          <div className="detail-item">
            <FaBath className="detail-icon" />
            <span>{currentProperty.bathrooms} Bathrooms</span>
          </div>
          <div className="detail-item">
            <FaRulerCombined className="detail-icon" />
            <span>{currentProperty.area} sq ft</span>
          </div>
          <div className="detail-item">
            <FaStar className="detail-icon" />
            <span>{currentProperty.rating} Rating ({currentProperty.likes} likes)</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="description-section">
        <h2>Description</h2>
        <p>{currentProperty.description}</p>
      </div>

      {/* Amenities */}
      <div className="amenities-section">
        <h2>Special Amenities</h2>
        <div className="amenities-grid">
          {currentProperty.amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <span className="amenity-bullet">•</span> {amenity}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="like-btn">
          <FaHeart /> Like
        </button>
        <button className="share-btn">
          <FaShare /> Share
        </button>
        <button onClick={isBookProperty} className="book-btn">
          Book Now
        </button>
      </div>
    </div>
    </>
  );
};

export default PropertyDetails;