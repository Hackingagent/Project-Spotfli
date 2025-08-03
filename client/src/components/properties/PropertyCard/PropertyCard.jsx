// components/PropertyCard/PropertyCard.jsx
import { useState } from 'react';
import styles from './PropertyCard.module.css';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiEye } from 'react-icons/fi';

const PropertyCard = ({ property, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? property.files.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === property.files.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.card} onClick={() => onClick(property)}>
      <div className={styles.imageContainer}>
        {property.files.length > 0 ? (
          <>
            <img 
              src={`http://localhost:5000${property.files[currentImageIndex].url}`} 
              alt={`Property ${currentImageIndex + 1}`}
              className={styles.propertyImage}
            />
            {property.files.length > 1 && (
              <>
                <button 
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={handlePrev}
                >
                  <FiChevronLeft />
                </button>
                <button 
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={handleNext}
                >
                  <FiChevronRight />
                </button>
                <div className={styles.imageCounter}>
                  {currentImageIndex + 1}/{property.files.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={styles.placeholderImage}>
            <FiEye size={32} />
          </div>
        )}
        <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <FiHeart />
        </button>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.priceBadge}>
          ${property.data.price?.toLocaleString() || 'N/A'}
        </div>
        <h3 className={styles.propertyTitle}>{property.data.title || 'Untitled Property'}</h3>
        <p className={styles.propertyLocation}>
          {property.data.location || 'Location not specified'}
        </p>
        
        <div className={styles.propertyFeatures}>
          <span>{property.data.bedrooms || 0} Beds</span>
          <span>{property.data.bathrooms || 0} Baths</span>
          <span>{property.data.area || 0} sqft</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;