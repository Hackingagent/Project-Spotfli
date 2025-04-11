import React, { useState } from 'react'; // Import useState
import logo from '../../assets/logo1.png';
import '../home/home.css';
import LogedinNav from '../navbar/LoggedinNav';
import OptionBar from './optionBar/OptionBar';
import Listings from './listings/Listings';
import propertyList from './listings/propertyList';
import SideBar from './sideBar/SideBar';
import { Link } from 'react-router-dom';
import DefaultListings from './listings/DefaultListings';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <LogedinNav />
      <div className="home-container">
        <div className="home-option-bar">
          <OptionBar toggleSidebar={toggleSidebar} /> {/* Pass the toggle function */}
        </div>
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass isOpen and toggle function */}
        
      </div>
    </>
  );
};

export default Home;