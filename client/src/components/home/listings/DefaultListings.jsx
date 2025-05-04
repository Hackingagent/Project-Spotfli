import React, { useState } from 'react'
import Listings from './Listings'
import propertyList from './propertyList';
import '../home.css'
import PropertyFilter from '../filters/PropertyFilter';
const DefaultListings = () => {
  const [showFilterP, setShowFilterP] = useState(false);
  // function to toggle filter display
  function toggleFilter (){
    setShowFilterP(!showFilterP);
  }
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
    {propertyList.map((property) => (
        <Listings
        key={property.id}
        image={property.image}
        title={property.title}
        type={property.type}
        price={property.price}
        rating={property.rating}
        />
    ))}
    </div>
    </div>
    </>
  )
}

export default DefaultListings
