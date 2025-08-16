import React, { useEffect, useState } from 'react';
import rentPropertyList from './rentPropertyList';
import RentProperty from './RentProperty';
import '../../home.css';
import { getAllProperties } from '../../../../api/user/property/property';
import Loader from '../../../common/Loader';


const Rent = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  
  useEffect(() => {
    const fetchProperties = async() => {
      setLoading(true);
      try {
        const response = await getAllProperties()

        console.log('Response: ', response);

        setProperties(response.properties);
      } catch (error) {
        setError(error.message);

      }finally {
        setLoading(false);
      }
      
    }

    fetchProperties();
  }, []);




  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  
  return (

    <>
      <h2 className='section-title'>
        Properties For Rent <i className="fa fa-building"></i>
      </h2>
      <div className="all-listings">
        <div className="listings-container">
          {properties?.length > 0 ? (
            properties?.map((property) => (
            property?.category?.name === 'For Rent' ? (
              <RentProperty
                key={property._id}
                id={property._id}
                image={`${import.meta.env.VITE_FILE_API_URL}${property.files?.[0]?.url}`}
                name={property.data.name}
                location={property.data.location}
                floors={property.data.floors}
                rooms={property.data.rooms}
                
                // status={property.status}
                // category={property.category.name}
                // subcategory={property.subcategory.name}
                // createdAt={property.createdAt}
              />
            ): (
            <div className="no-hotels">
                <p>No Properties available for Sale at the moment.</p>
            </div>
          )
          ))): (
            <div className="no-hotels">
                <p>No Properties available for Rent at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Rent
