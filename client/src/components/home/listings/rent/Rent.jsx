import React, { useEffect, useState } from 'react';
import rentPropertyList from './rentPropertyList';
import RentProperty from './RentProperty';
import '../../home.css';
import { getAllProperties } from '../../../../api/user/property/property';
const Rent = () => {

  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    const fetchProperties = async() => {
      const response = await getAllProperties()

      console.log('Response: ', response);

      setProperties(response.properties);
    }

    fetchProperties();
  }, []);



  
  return (

    <>
      <h2 className='section-title'>
        Properties For Rent <i className="fa fa-building"></i>
      </h2>
      <div className="all-listings">
        <div className="listings-container">
              {properties.data && Object.entries(properties.data).map(([key, value]) => (
                <RentProperty 
                  key={value.id}
                  image={properties.files?.[0]?.url}
                  name ={value.name}
                  location={value.location}
                  floors={value.floors}
                  rooms={value.rooms}
                  
                />
                ))}
        </div>
      </div>
    </>
  )
}

export default Rent
