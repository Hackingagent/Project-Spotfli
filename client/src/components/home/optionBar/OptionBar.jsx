import React from 'react'
import menu from '../../../assets/menu.png';
import beach from '../../../assets/option-icons/beach.png';
import buy from '../../../assets/option-icons/buy-home.png';
import rent from '../../../assets/option-icons/house.png';
import hotel from '../../../assets/option-icons/hotel.png';
import guest from '../../../assets/option-icons/furniture.png';
import mate from '../../../assets/option-icons/shared-flat.png';
import service from '../../../assets/option-icons/services.png';
import { GrServices } from "react-icons/gr";
import { FaHotel } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { MdApartment,MdRealEstateAgent,MdOutlineMeetingRoom } from "react-icons/md";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

import './optionBar.css';
import { Link } from 'react-router-dom';


const OptionBar = ({ toggleSidebar, toggleFilter }) => { // Receive toggleSidebar as a prop
  return (
    <div className="option-bar">
      <div className="menu" onClick={toggleSidebar}> {/* Add onClick event */}
        <RiMenuUnfoldFill className='sidebar-menu' />
      </div>
      <div className="all-optionsB">
      <div className="options">
       <Link className='links' to='/rent'>
        <div className="option option1">
          
            < MdApartment className='optionbar-icons'/>
            <span>Rent</span>
        </div>
        </Link>

        <Link className='links' to='/buy'>
        <div className="option option1">
            <MdRealEstateAgent className='optionbar-icons'/>
            <span>Buy</span>
        </div>
        </Link>


        <Link className='links' to='/hotels'>
        <div className="option option1">
            <FaHotel className='optionbar-icons'/>
            <span>Hotel</span>
        </div>
        </Link>

{/* 
        <Link className='links' to='/'>
        <div className="option option1">
            <img src={beach} alt="Rent-icon" />
            <span>Vacation</span>
        </div>
        </Link> */}


        <Link className='links' to='/coliving'>
        <div className="option option1">
            <MdOutlineMeetingRoom className='optionbar-icons'/>
            <span>Co-Living</span>
        </div>
        </Link>


        <Link className='links' to='/'>
        <div className="option option1">
            <FaHouseChimneyUser className='optionbar-icons'/>
            <span>Guest House</span>
        </div>
        </Link>


        <Link className='links' to='/serviceProvider'>
        <div className="option option1">
            <GrServices className='optionbar-icons'/>
            <span>Services</span>
        </div>
        </Link>
        
      </div>
      </div>
    </div>
  )
}

export default OptionBar
