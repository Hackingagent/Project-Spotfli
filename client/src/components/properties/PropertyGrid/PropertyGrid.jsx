// components/PropertyGrid/PropertyGrid.jsx
import styles from './PropertyGrid.module.css';
import PropertyCard from '../PropertyCard/PropertyCard';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyGrid = ({ properties }) => {

  const navigate = useNavigate();

  const handlePropertyClick = (property) => {
    // Navigate to the property detail page with the property ID
    navigate(`/property/property-details/${property._id}`);
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.propertyGrid}>
        {properties.map(property => (
          <PropertyCard 
            key={property._id} 
            property={property}
            onClick={() => handlePropertyClick(property)}
          />
        ))}
      </div>

      
    </div>
  );
};

export default PropertyGrid;