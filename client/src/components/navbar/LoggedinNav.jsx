import React from 'react';
import logo from '../../assets/logo1.png';
import './loggedInNav.css';
import bell from '../../assets/bell.png';
import message from '../../assets/comment.png';
import profile from '../../assets/profile.jpg';
// import light from '../../assets/light.png';
import { Link } from 'react-router-dom';
const LogedinNav = ({toggleAccountBar}) => {
  return (
   <div className='loggedin-nav'>
      <div className="nav-left">
          <Link to='/'>
          <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="search-bar">
            <input type="text" placeholder='Ask me anything' />
            <i className="fa fa-microphone"></i>
            <i className="fa fa-camera"></i>
            <button>Search <i className="fa fa-search"></i></button>
          </div>
      </div>

      <div className="nav-right">
            <div className="theme">
             <Link to='/chatapp'><img src={message} alt="" /></Link>
              <img src={bell} alt="" />
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
