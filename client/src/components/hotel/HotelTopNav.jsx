import { useEffect, useState } from 'react';
import { getCurrentHotel } from '../../api/hotel/hotelApi';
import logo from '../../assets/icon.png';

import './HotelTopNav.css';

const HotelTopNav = ({ toggleSidebar }) => {

  const [hotel, setHotel] = useState([])

  const fetchHotel = async() => {
    const response = await getCurrentHotel();
    console.log("Hotel Information: ", response.hotel);
    setHotel(response.hotel);

  }

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <header className="hoteldash-topnav">
      <div className="hoteldash-topnav-left">
        <button 
          onClick={toggleSidebar} 
          className="hoteldash-menu-toggle"
        >
         <span>Side Menu</span> <i className="fa fa-bars"></i>
        </button>
        {/* <div className="hoteldash-search">
          <input type="text" placeholder="Search..." />
          <i className="fa fa-search"></i>
        </div> */}
      </div>
      <div className="hoteldash-topnav-right">
        <div className="hoteldash-profile">
          <img 
            src={logo} 
            alt="Hotel Logo" 
            className="hoteldash-logo"
          />
          <span>{hotel.hotelName}</span>
        </div>
      </div>
    </header>
  );
};

export default HotelTopNav;