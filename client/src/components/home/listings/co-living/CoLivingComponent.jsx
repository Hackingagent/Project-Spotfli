import React from 'react';
import './coLiving.css';
import user1 from '../../../../assets/service images/service4.jpg';
const CoLivingComponent = (props) => {
  return (
    <>
    <div className="co-living-component">
      <div className="co-image-container">
        <img src={props.image} alt="person" />
      </div>
      <div className="co-details">
      <h3>{props.searchername} <i className="fa fa-check verified"></i> </h3>
        <span>{props.building}  <i className="fa fa-building"></i></span>
        <span className='location'>{props.location} <i className="fa fa-map-marker"></i></span>
        <span className='house-type'>{props.type}</span>
        <span className='rent-amount'>Rent: {props.rent} FCFA / {props.splitpercentage}% Split</span>
        <p>
          {props.description}
        </p>
      </div>
    </div>
    </>
  )
}

export default CoLivingComponent
