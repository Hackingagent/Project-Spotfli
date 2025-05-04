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
import { Link } from 'react-router-dom';


const OptionBar = ({ toggleSidebar, toggleFilter }) => { // Receive toggleSidebar as a prop
  return (
    <div className="option-bar">
      <div className="menu" onClick={toggleSidebar}> {/* Add onClick event */}
        <img src={menu} alt="menu button" />
      </div>
      <div className="all-optionsB">
      <i className="scroll fa fa-chevron-left"></i>

      <div className="options">
       <Link className='links' to='/rent'>
        <div className="option option1">
          
            <img src={rent} alt="Rent-icon" />
            <span>Rent</span>
        </div>
        </Link>

        <Link className='links' to='/buy'>
        <div className="option option1">
            <img src={buy} alt="Rent-icon" />
            <span>Buy</span>
        </div>
        </Link>


        <Link className='links' to='/hotels'>
        <div className="option option1">
            <img src={hotel} alt="Rent-icon" />
            <span>Hotel</span>
        </div>
        </Link>


        <Link className='links' to='/'>
        <div className="option option1">
            <img src={beach} alt="Rent-icon" />
            <span>Vacation</span>
        </div>
        </Link>


        <Link className='links' to='/coliving'>
        <div className="option option1">
            <img src={mate} alt="Rent-icon" />
            <span>Co-Living</span>
        </div>
        </Link>


        <Link className='links' to='/'>
        <div className="option option1">
            <img src={guest} alt="Rent-icon" />
            <span>Guest House</span>
        </div>
        </Link>


        <Link className='links' to='/serviceProvider'>
        <div className="option option1">
            <img src={service} alt="Rent-icon" />
            <span>Service Provider</span>
        </div>
        </Link>
        
      </div>
      <i className="scroll fa fa-chevron-right"></i>
      </div>
    </div>
  )
}

export default OptionBar
