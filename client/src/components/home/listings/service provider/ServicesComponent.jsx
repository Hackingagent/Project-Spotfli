import React from 'react'
import '../../listings/listings.css';
import { Link } from 'react-router-dom';

const ServicesComponent = (props) => {
  return (
   <Link className='links' to='/singleProvider'>
    <div className='listing'>
      <div className="img">
        <i className="fa fa-heart"></i>
        <img src={props.image} alt="" />
      </div>
      <div className="listing-description">
        <div className="descriptions">
          <div className='listing-title'>{props.name} <i className="fa fa-check verified"></i></div>
          <span className="distance">{props.category}</span>
          <div className="price">{props.availability}</div>
        </div>

        <div className="rating">
          <i className="fa fa-star"></i>
          <span>{props.rating}</span>
        </div>
      </div>

    </div>
    </Link>
  )
}

export default ServicesComponent
