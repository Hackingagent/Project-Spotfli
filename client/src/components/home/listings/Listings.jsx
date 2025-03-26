import React from 'react';
import './listings.css';

const Listings = (props) => {
  return (
    <div className='listing'>
      <div className="img">
        <i className="fa fa-heart"></i>
        <img src={props.image} alt="" />
      </div>
      <div className="listing-description">
        <div className="descriptions">
          <div className='listing-title'>{props.title}</div>
          <span className="distance">{props.type}</span>
          <div className="price">XAF {props.price}/<span>Month</span></div>
        </div>

        <div className="rating">
          <i className="fa fa-star"></i>
          <span>{props.rating}</span>
        </div>
      </div>

    </div>
  )
}

export default Listings
