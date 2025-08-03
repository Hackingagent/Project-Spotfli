// components/PropertyModal/PropertyModal.jsx
import { useState, useEffect } from 'react';
import styles from './PropertyModal.module.css';
import { FiX, FiChevronLeft, FiChevronRight, FiHeart, FiShare2 } from 'react-icons/fi';

const PropertyModal = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.files.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => 
      prev === property.files.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>

        <div className={styles.modalContent}>
          <div className={styles.imageGallery}>
            {property.files.length > 0 ? (
              <>
                <img 
                    src={`http://localhost:5000${property.files[currentImageIndex].url}`} 
                    alt={`Property ${currentImageIndex + 1}`}
                  className={styles.mainImage}
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
                    <div className={styles.thumbnailContainer}>
                      {property.files.map((file, index) => (
                        <img
                          key={index}
                          src={`http://localhost:5000${file.url}`}
                          alt={`Thumbnail ${index + 1}`}
                          className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className={styles.placeholderImage}>
                <FiEye size={48} />
                <p>No images available</p>
              </div>
            )}
          </div>

          <div className={styles.propertyDetails}>
            <div className={styles.header}>
              <h2>{property.data.title || 'Untitled Property'}</h2>
              <div className={styles.actionButtons}>
                <button 
                  className={`${styles.iconButton} ${isFavorite ? styles.favorite : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FiHeart />
                </button>
                <button className={styles.iconButton}>
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className={styles.price}>${property.data.price?.toLocaleString() || 'N/A'}</div>
            <p className={styles.location}>{property.data.location || 'Location not specified'}</p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <span>Bedrooms</span>
                <strong>{property.data.bedrooms || 0}</strong>
              </div>
              <div className={styles.feature}>
                <span>Bathrooms</span>
                <strong>{property.data.bathrooms || 0}</strong>
              </div>
              <div className={styles.feature}>
                <span>Area</span>
                <strong>{property.data.area || 0} sqft</strong>
              </div>
            </div>

            <div className={styles.section}>
              <h3>Description</h3>
              <p>{property.data.description || 'No description provided.'}</p>
            </div>

            {property.data.amenities && (
              <div className={styles.section}>
                <h3>Amenities</h3>
                <div className={styles.amenities}>
                  {property.data.amenities.map((amenity, index) => (
                    <span key={index} className={styles.amenity}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;