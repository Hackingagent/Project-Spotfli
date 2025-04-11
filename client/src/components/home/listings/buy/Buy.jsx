import React from 'react';
import BuyProperty from './BuyProperty';
import buyPropertyList from './buyPropertyList';
import '../../home.css'
const Buy = () => {
  return (
    <>
      <h2 className='section-title'>
        Properties For Sale <i className="fa fa-money"></i>
      </h2>
      <div className="all-listings">
        <div className="listings-container">
            {buyPropertyList.map((property) => (
                <BuyProperty 
                key={property.id}
                image={property.image}
                title ={property.title}
                type={property.type}
                price={property.price}
                rating={property.ating}
                />
            ))}
        </div>
      </div>
    </>
  )
}

export default Buy
