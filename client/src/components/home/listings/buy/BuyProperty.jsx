import React from 'react'
import '../listings.css';

import { Link, useNavigate } from 'react-router-dom';
const BuyProperty = (props) => {

  const navigate = useNavigate();

  const handleViewProperty = () => {
    navigate(`/propertyDetails/${props.id}`)
  }
  
  return (
    <div onClick={handleViewProperty}>
    {/* <Link className='links' to='/propertydetails'> */}
      <div className='listing'>
        <div className="img">
          <i className="fa fa-heart"></i>
          <img src={props.image} alt="" />
        </div>
        <div className="listing-description">
          <div className="descriptions">
            <div className='listing-title'>{props.name}</div>
            <span className="distance"> Floor: {props.floors} <tr />  Rooms: {props.rooms}</span>
            <div className="price"> <FaMapMarkerAlt className="location-icon" /> {props.location}</div>
          </div>

          <div className="rating">
            <i className="fa fa-star"></i>
            <span>{props.rating}</span>
          </div>
        </div>

      </div>
    {/* </Link> */}
    </div>
  )
}

export default BuyProperty
