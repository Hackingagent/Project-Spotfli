// pages/Properties.jsx
import { useEffect, useState } from 'react';
import styles from './properties.module.css';
import { getUserProperties } from '../../../../api/user/property/property';
import PropertyGrid from '../../../properties/PropertyGrid/PropertyGrid';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await getUserProperties();

        setProperties(response.properties);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading your properties...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Properties</h1>
      <PropertyGrid properties={properties} />
    </div>
  );
};

export default Properties;