import React, { useState } from 'react'
import serviceProviderList from './serviceProviderList';
import ServicesComponent from './ServicesComponent';
import '../../home.css';
import ServiceProviderFilter from '../../filters/ServiceProviderFilter';
const Services = () => {
    const [showFilterP, setShowFilterP] = useState(false);
    // function to toggle filter display
    function toggleFilter (){
      setShowFilterP(!showFilterP);
    }
  return (
    <>
        {/* conditional rendering of property filter */}
        {showFilterP && <ServiceProviderFilter toggleFilter={toggleFilter} />}
    <div className="listings-top">
      <h2 className="section-title">
        Services Near You <i className="fa fa-map-marker"></i>
      </h2>
      {/* filter div */}
      <div onClick={toggleFilter} className='filter-page-content'>
            <i class="fas fa-sliders-h"></i>
            <span>Filter Services</span>
      </div>
    </div>
      <div className="all-listings">
        <div className="listings-container">
            {serviceProviderList.map((property) => (
                <ServicesComponent 
                key={property.id}
                image={property.image}
                name ={property.name}
                category={property.category}
                availability={property.availability}
                rating={property.rating}
                />
            ))}
        </div>
      </div>
    </>
  )
}

export default Services
