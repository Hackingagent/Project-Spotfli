import React from 'react';
import './listings.css';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Listings = (props) => {
  return (
    <>
    <Link className='links' to='/propertydetails'>
    <div className='listing'>
      <div className="img">
        <i className="fa fa-heart"></i>
        <img src={props.image} alt="" />
      </div>
      <div className="listing-description">
        <div className="descriptions">
          <div className='listing-title'>{props.name}</div>
          <span className="distance">{props.floors} Floors <tr /> {props.rooms} Rooms</span>
          <div className="price"><FaMapMarkerAlt /> {props.location}</div>
        </div>

        <div className="rating">
          <i className="fa fa-star"></i>
          <span>{props.rating}</span>
        </div>
      </div>

    </div>
    </Link>
    </>
  )
}

export default Listings
