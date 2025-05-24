import React from 'react';
import logo from '../../../../../assets/logo2.png'

import './sidenav.css';
const SideNav = () => {
  return (
    <div className='hotel-sidenav'>
      <div className="hotel-logo-container">
        <img src={logo}></img>
      </div>
      <div className="dashboard-sign">
        <i className="fa fa-dashboard"></i>
        <span>Dashboard</span>
      </div>
    </div>
  )
}

export default SideNav
