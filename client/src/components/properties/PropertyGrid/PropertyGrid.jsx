// components/PropertyGrid/PropertyGrid.jsx
import styles from './PropertyGrid.module.css';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useState } from 'react';
import PropertyModal from '../PropertyModal/PropertyModal';

const PropertyGrid = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.propertyGrid}>
        {properties.map(property => (
          <PropertyCard 
            key={property._id} 
            property={property}
            onClick={() => setSelectedProperty(property)}
          />
        ))}
      </div>

      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default PropertyGrid;