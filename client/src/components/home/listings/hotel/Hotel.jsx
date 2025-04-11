import React from 'react';
import hotelList from './hotelList';
import HotelComponent from './HotelComponent';

const Hotel = () => {
  return (
    <>
      <h2 className='section-title'>
        Hotels in your area <i className="fa fa-hotel"></i>
      </h2>
      <div className="all-listings">
        <div className="listings-container">
          {hotelList.map((hotel) => (
            <HotelComponent
            key = {hotel.id}
            hotelname = {hotel.hotelname}
            image = {hotel.image}
            type = {hotel.type}
            price = {hotel.price}
            rating = {hotel.rating}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Hotel
