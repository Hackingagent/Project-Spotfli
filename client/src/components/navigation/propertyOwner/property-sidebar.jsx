import React, { useState } from 'react';
import {FiHome,FiUsers,FiCheckCircle,FiDollarSign,FiPieChart,FiAlertTriangle,FiSettings,FiMenu, FiChevronDown, FiChevronRight} from 'react-icons/fi';
import { FaBuilding, FaTools } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';

const PropertySidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();
  return (
    <div className={`property_sidebar ${open ? 'open' : 'closed'} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        {open ? (
          <>
            <h2>SPOTFLI</h2>
            <button onClick={onToggle} className="hoteldash-sidebar-toggle">
              <i className='fa fa-times'></i>
            </button>
          </>
          
        ) : (
          <div className="sidebar-logo">
            <h3>SF</h3>
            <button onClick={onToggle} className="hoteldash-sidebar-toggle">
              <i className='fa fa-bars'></i>
            </button>
          </div>
        )}
      </div>
      <div className="sidebar-menu">
        <SidebarItem
          icon={<FiHome />}
          text="Dashboard"
          active={activeTab === 'dashboard'}
          onClick={() => {
            onTabChange('dashboard')
            navigate('/property', {replace: true})
          }}
          open={open}
        />

        <SidebarItem
          icon={<FiHome />}
          text="View Property"
          active={activeTab === 'view-property'}
          onClick={() => {
            onTabChange('view-property')
            navigate('/property/view-properties', {replace: true})
          }}
          open={open}
        />

        <SidebarItem
          icon={<FiHome />}
          text="Add Property"
          active={activeTab === 'add-property'}
          onClick={() => {
            onTabChange('add-property')
            navigate('/property/add-property', {replace: true})
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

        <SidebarItem
          icon={<FiSettings />}
          text="Back to Home"
          active={activeTab === 'back'}
          onClick={() => {
            onTabChange('back')
            navigate('/', {replace: true})
          }}
          open={open}
        />
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

export default PropertySidebar;