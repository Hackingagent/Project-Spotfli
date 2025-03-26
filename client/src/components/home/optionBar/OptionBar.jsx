import React from 'react'
import menu from '../../../assets/menu.png';
import beach from '../../../assets/option-icons/beach.png';
import buy from '../../../assets/option-icons/buy-home.png';
import rent from '../../../assets/option-icons/house.png';
import hotel from '../../../assets/option-icons/hotel.png';
import guest from '../../../assets/option-icons/furniture.png';
import mate from '../../../assets/option-icons/shared-flat.png';
import service from '../../../assets/option-icons/services.png';
import './optionBar.css';


const OptionBar = ({ toggleSidebar }) => { // Receive toggleSidebar as a prop
  return (
    <div className="option-bar">
      <div className="menu" onClick={toggleSidebar}> {/* Add onClick event */}
        <img src={menu} alt="menu button" />
      </div>
      <div className="options">
        <div className="option option1">
            <img src={rent} alt="Rent-icon" />
            <span>Rent</span>
        </div>

        <div className="option option1">
            <img src={buy} alt="Rent-icon" />
            <span>Buy</span>
        </div>

        <div className="option option1">
            <img src={hotel} alt="Rent-icon" />
            <span>Hotel</span>
        </div>

        <div className="option option1">
            <img src={beach} alt="Rent-icon" />
            <span>Vacation</span>
        </div>

        <div className="option option1">
            <img src={mate} alt="Rent-icon" />
            <span>Co-Living</span>
        </div>

        <div className="option option1">
            <img src={guest} alt="Rent-icon" />
            <span>Guest House</span>
        </div>

        <div className="option option1">
            <img src={service} alt="Rent-icon" />
            <span>Service Provider</span>
        </div>

      </div>
    </div>
  )
}

export default OptionBar
