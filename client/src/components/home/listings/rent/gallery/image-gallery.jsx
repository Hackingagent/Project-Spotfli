import { useState } from 'react';
// import styles from './PropertyCard.module.css';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiEye } from 'react-icons/fi';
import './image-gallery.css';

const ImageGallery = ({ room }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? room.files.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === room.files.length - 1 ? 0 : prev + 1
    );
  };


  return (
    <div>
      <div className='imageContainer' >
        {room.files.length > 0 ? (
          <>
            <img 
              src={`${import.meta.env.VITE_FILE_API_URL}${room.files[currentImageIndex].url}`} 
              alt={`Property ${currentImageIndex + 1}`}
              className='roomImage'
              onError={(e) => {
                e.target.src = '/placeholder-property.jpg';
              }}
            />
            {room.files.length > 1 && (
              <>
                <button 
                  className='navButton prevButton'
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <FiChevronLeft />
                </button>
                <button 
                  className='navButton nextButton'
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <FiChevronRight />
                </button>
                <div 
                 className='imageCounter'
                >
                  {currentImageIndex + 1}/{room.files.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div
        //   className={styles.placeholderImage}
            >
            <FiEye size={32} />
          </div>
        )}

      </div>


    </div>
  );
};

export default ImageGallery;