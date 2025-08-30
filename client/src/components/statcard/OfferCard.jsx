import React, { useState, useEffect } from 'react';
import styles from './OfferCard.module.css';

const OfferCard = ({ offer, onEdit, onDelete, isLoading }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorType, setErrorType] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  // Get the image source URL with cache-busting
  const getImageSource = () => {
    if (!offer.images || offer.images.length === 0) return '';
    
    const imageData = offer.images[0];
    let filename = '';
    
    // Extract filename from different data formats
    if (typeof imageData === 'string') {
      filename = imageData;
    } else if (imageData.url) {
      filename = imageData.url;
    } else if (imageData.filename) {
      filename = imageData.filename;
    } else if (imageData.path) {
      filename = imageData.path.split('\\').pop().split('/').pop();
    }
    
    // Remove any leading path or URL parts
    if (filename.includes('/')) {
      filename = filename.split('/').pop();
    }
    
    // Check if filename already has the uploads path
    let finalUrl;
    if (filename.includes('uploads/')) {
      finalUrl = `${API_BASE_URL}/${filename}`;
    } else {
      finalUrl = `${API_BASE_URL}/uploads/${filename}`;
    }
    
    // Add cache-busting parameter to prevent 304 issues
    return `${finalUrl}?t=${new Date().getTime()}`;
  };

  // Update image source when offer changes
  useEffect(() => {
    const src = getImageSource();
    setImageSrc(src);
    
    console.log('Offer object:', offer);
    
    if (offer.images && offer.images.length > 0) {
      console.log('First image object:', offer.images[0]);
      console.log('Constructed URL:', src);
      
      setDebugInfo(`Image data: ${JSON.stringify(offer.images[0])}`);
    } else {
      console.log('No images found in offer');
      setDebugInfo('No images in offer');
    }
    
    // Reset image state
    setImageError(false);
    setImageLoaded(false);
    setErrorType('');
  }, [offer]);

  const handleImageError = (e) => {
    console.error('Image failed to load:', e);
    console.error('Failed URL:', e.target.src);
    setErrorType('load_error');
    setImageError(true);
    
    // Try without cache-busting as fallback
    if (e.target.src.includes('?')) {
      const fallbackUrl = e.target.src.split('?')[0];
      console.log('Trying fallback URL:', fallbackUrl);
      setImageSrc(fallbackUrl);
      setImageError(false);
    }
  };

  const handleImageLoad = (e) => {
    console.log('Image loaded successfully');
    setImageLoaded(true);
    setErrorType('');
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case 'cors_error':
        return 'CORS error: Check server configuration';
      case 'network_error':
        return 'Network error: Cannot reach server';
      case 'server_error':
        return 'Server error: Image not found (404)';
      case 'load_error':
        return 'Failed to load image';
      default:
        return 'Failed to load image';
    }
  };

  return (
    <div className={styles.offerCard}>
      {/* Offer Image with proper error handling */}
      {offer.images && offer.images.length > 0 ? (
        <div className={styles.imageContainer}>
          <div style={{fontSize: '10px', color: 'gray', marginBottom: '5px'}}>
            {imageSrc}
          </div>
          <div style={{fontSize: '8px', color: 'blue', marginBottom: '5px'}}>
            {debugInfo}
          </div>
          
          {!imageError && imageSrc ? (
            <img 
              src={imageSrc} 
              alt={offer.title}
              className={styles.offerImage}
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              crossOrigin="anonymous"
            />
          ) : null}
          
          {imageError && (
            <div className={styles.imagePlaceholder}>
              Image not available
              <div style={{fontSize: '10px', color: 'red', marginTop: '5px'}}>
                {getErrorMessage()}
              </div>
              <div style={{fontSize: '8px', color: 'gray', marginTop: '5px'}}>
                URL: {imageSrc}
              </div>
            </div>
          )}
          
          {!imageLoaded && !imageError && imageSrc && (
            <div className={styles.imageLoading}>
              Loading image...
            </div>
          )}
        </div>
      ) : (
        <div className={styles.imagePlaceholder}>
          No image available
          <div style={{fontSize: '10px', color: 'red'}}>
            Debug: Images array - {offer.images ? offer.images.length : 'undefined'}
          </div>
        </div>
      )}
      
      {/* Offer Content */}
      <div className={styles.offerContent}>
        <h3 className={styles.offerTitle}>
          {offer.title || "Untitled Offer"}
        </h3>
        
        {/* Price and Experience */}
        <div className={styles.offerDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Price:</span>
            <span className={styles.detailValue}>XAF {offer.price?.toLocaleString()}</span>
          </div>
          
          {offer.experience && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Experience:</span>
              <span className={styles.detailValue}>{offer.experience} years</span>
            </div>
          )}
          
          {/* Service Name */}
          {offer.service?.name && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Service:</span>
              <span className={styles.detailValue}>{offer.service.name}</span>
            </div>
          )}
        </div>
        
        {/* Description (truncated) */}
        {offer.description && (
          <p className={styles.offerDescription}>
            {offer.description.length > 100 
              ? `${offer.description.substring(0, 100)}...` 
              : offer.description
            }
          </p>
        )}
        
        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            className={styles.editButton}
            onClick={() => onEdit(offer)}
            disabled={isLoading}
          >
            Edit
          </button>
          <button 
            className={styles.deleteButton}
            onClick={() => onDelete(offer._id)}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;