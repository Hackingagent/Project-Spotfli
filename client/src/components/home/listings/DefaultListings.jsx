import React from 'react'
import Listings from './Listings'
import propertyList from './propertyList';
import '../home.css'
const DefaultListings = () => {
  return (
    <>
    <h2 className="section-title">
      Houses Near You <i className="fa fa-map-marker"></i>
    </h2>
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
