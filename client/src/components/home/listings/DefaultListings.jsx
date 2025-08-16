import React, { useEffect, useState } from 'react'
import Listings from './Listings'
import propertyList from './propertyList';
import '../home.css'
import PropertyFilter from '../filters/PropertyFilter';
import { getAllProperties } from '../../../api/user/property/property';
import Loader from '../../common/Loader';


const DefaultListings = () => {
  const [showFilterP, setShowFilterP] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // function to toggle filter display
  function toggleFilter (){
    setShowFilterP(!showFilterP);
  }
  
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
    {/* conditional rendering of property filter */}
    {showFilterP && <PropertyFilter toggleFilter={toggleFilter} />}
    <div className="listings-top">
      <h2 className="section-title">
        Houses Near You <i className="fa fa-map-marker"></i>
      </h2>
      {/* filter div */}
      <div onClick={toggleFilter} className='filter-page-content'>
            <i class="fas fa-sliders-h"></i>
            <span>Filters</span>
      </div>
    </div>
    <div className="all-listings">
    <div className="listings-container">
    {properties?.length > 0 ? (
      properties?.map((property) => (
        <Listings
          key={property._id}
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

export default DefaultListings
