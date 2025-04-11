import React from 'react';
import serviceProviderList from './serviceProviderList';
import ServicesComponent from './ServicesComponent';
import '../../home.css';
const Services = () => {
  return (
    <>
      <h2 className='section-title'>
       Service Providers Near You<i className="fa fa-gear"></i>
      </h2>
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
