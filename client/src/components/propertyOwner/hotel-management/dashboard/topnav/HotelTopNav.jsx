import React from 'react';
import profile from '../../../../../assets/profile.jpg'

import './hoteltopnav.css'

const HotelTopNav = () => {
  return (
    <div className='hotel-top-nav'>
      <div className="hotel-name">
        <h2><i className="fa fa-hotel"></i> Main Land Hotel</h2>
      </div>
      <div className="hotel-top-profile">
        <i className="fa fa-bell"></i>
        <i className="fa fa-message"></i>
        <img src={profile} alt="" />
      </div>
    </div>
  )
}

export default HotelTopNav
