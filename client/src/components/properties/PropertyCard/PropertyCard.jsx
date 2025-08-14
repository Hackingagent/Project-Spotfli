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

  // Get the most important features to display based on field definitions
  const getKeyFeatures = () => {
    // These are common important fields to show
    const commonFeatures = ['bedrooms', 'bathrooms', 'area', 'size', 'rooms'];
    
    // Find which of these exist in the property data
    return commonFeatures.filter(feature => 
      property.data[feature] !== undefined && property.data[feature] !== null
    ).slice(0, 3); // Show max 3 features
  };

  // Format feature values appropriately
  const formatFeatureValue = (key, value) => {
    if (key === 'area' || key === 'size') return `${value} sqft`;
    if (key === 'bedrooms') return `${value} Bed${value !== 1 ? 's' : ''}`;
    if (key === 'bathrooms') return `${value} Bath${value !== 1 ? 's' : ''}`;
    return value;
  };

  const keyFeatures = getKeyFeatures();

  return (
    <div className={styles.card} onClick={() => onClick(property)}>
      <div className={styles.imageContainer}>
        {property.files.length > 0 ? (
          <>
            <img 
              src={`http://localhost:5000${property.files[currentImageIndex].url}`} 
              alt={`Property ${currentImageIndex + 1}`}
              className={styles.propertyImage}
              onError={(e) => {
                e.target.src = '/placeholder-property.jpg';
              }}
            />
            {property.files.length > 1 && (
              <>
                <button 
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <FiChevronLeft />
                </button>
                <button 
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={handleNext}
                  aria-label="Next image"
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
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart />
        </button>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.priceBadge}>
          {property.data.name || 'Untitled Property'}
        </div>
        <h3 className={styles.propertyTitle}>
          {property.data.location || 'Location not specified' }
        </h3>
        <p className={styles.propertyLocation}>
          Rooms: {property.data.rooms}
        </p>
        
        {/* {keyFeatures.length > 0 && (
          <div className={styles.propertyFeatures}>
            {keyFeatures.map(feature => (
              <span key={feature}>
                {formatFeatureValue(feature, property.data[feature])}
              </span>
            ))}
          </div>
        )} */}

        {/* Display property type if available */}
        <div className={styles.propertyBottom}>
          {property.category?.name && (
            <div className={styles.propertyType}>
              {property.category.name}
              {property.subcategory?.name && ` • ${property.subcategory.name}`}
            </div>
          )}

          {property.status === 'submitted' && (
              <div className={`${styles.propertyStatus} ${styles.submitted}`}> <p>Property Under Review</p> </div>

          )}

          {property.status === 'declined' && (
              <div className={`${styles.propertyStatus} ${styles.declined}`}> <p>Property Declined</p> </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;