import React from 'react';
import logo from '../../assets/logo1.png';
import './loggedInNav.css';
import profile from '../../assets/profile.jpg';
import { LuMessageCircleCode } from "react-icons/lu";
import { IoNotificationsSharp } from "react-icons/io5";
// import light from '../../assets/light.png';
import { Link } from 'react-router-dom';
import SearchBarComponent from '../SearchBarComponent';
const LogedinNav = ({toggleAccountBar}) => {
  return (
   <div className='loggedin-nav'>
      <div className="nav-left">
          <Link to='/'>
          <img className="logo" src={logo} alt="logo" />
          </Link>
          <SearchBarComponent />
      </div>

      <div className="nav-right">
            <div className="theme">
             <Link to='/chatapp'><LuMessageCircleCode className='loggedinNavIcons' /></Link>
              <IoNotificationsSharp className='loggedinNavIcons' />
              {/* <img src={light} alt="" /> */}
            </div>
            
            <div className="profile-settings">
              <img src={profile} alt="" onClick={toggleAccountBar} />
            </div>
        
        </div>
    </div>
  )
}

export default LogedinNav
