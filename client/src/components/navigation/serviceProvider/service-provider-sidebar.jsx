import React, { useState } from 'react';
import {FiHome,FiUsers,FiCheckCircle,FiDollarSign,FiPieChart,FiAlertTriangle,FiSettings,FiMenu, FiChevronDown, FiChevronRight} from 'react-icons/fi';
import { FaBuilding, FaTools } from "react-icons/fa";
import { replace, useNavigate } from 'react-router-dom';
// import './Sidebar.css';

const ServiceProviderSidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();
  const [isServiceProviderOpen, setIsServiceProviderOpen] = useState(false);
  const [hotelDrop, isHotelDrop] = useState(false)

  // toggle service provider menu dropdown
  const toggleServiceProvider = () => {
    setIsServiceProviderOpen(!isServiceProviderOpen);
  };

  // toggle hotel menu deropdown
  const toggleHotelDrop = () => {
    isHotelDrop(!hotelDrop);
  }

  return (
    <div className={`sidebar ${open ? 'open' : 'closed'} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        {open ? (
          <h2>SPOTFLI</h2>
        ) : (
          <div className="sidebar-logo">SF</div>
        )}
      </div>
      <div className="sidebar-menu">
        <SidebarItem
          icon={<FiHome />}
          text="Dashboard"
          active={activeTab === 'dashboard'}
          onClick={() => {
            onTabChange('dashboard')
            navigate('/service-provider', {replace: true})
          }}
          open={open}
        />
        <SidebarItem
          icon={<FiHome />}
          text="My Bookings"
          active={activeTab === 'property-owner'}
          onClick={() => {
            onTabChange('property-owner')
            navigate('/admin', {replace: true})
          }}
          open={open}
        />
        <SidebarItem
          icon={<FaTools />}
          text="My Services"
          active={activeTab === 'services'}
          onClick={() => {
            onTabChange('services')
            navigate('/service-provider/my-service', {replace: true})
          }}
          open={open}
        />


        <SidebarItem
          icon={<FiSettings />}
          text="Settings"
          active={activeTab === 'settings'}
          onClick={() => onTabChange('settings')}
          open={open}
        />
      </div>
      <div className="sidebar-footer">
        <button
          onClick={onToggle}
          className="collapse-button"
        >
          <FiMenu />
          {open && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick, open, isSubItem }) => {
  return (
    <div
      onClick={onClick}
      className={`sidebar-item ${active ? 'active' : ''} ${isSubItem ? 'sub-item' : ''}`}
    >
      {icon && <div className="sidebar-icon">{icon}</div>}
      {open && <span>{text}</span>}
    </div>
  );
};

export default ServiceProviderSidebar;