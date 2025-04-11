import React from 'react';
import rentPropertyList from './rentPropertyList';
import RentProperty from './RentProperty';
import '../../home.css';
const Rent = () => {
  return (
    <>
      <h2 className='section-title'>
        Properties For Rent <i className="fa fa-building"></i>
      </h2>
      <div className="all-listings">
        <div className="listings-container">
            {rentPropertyList.map((property) => (
                <RentProperty 
                key={property.id}
                image={property.image}
                title ={property.title}
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

export default Rent
