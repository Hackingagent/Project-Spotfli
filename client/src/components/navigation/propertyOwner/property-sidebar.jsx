import React, { useState } from 'react';
import {FiHome,FiUsers,FiCheckCircle,FiDollarSign,FiPieChart,FiAlertTriangle,FiSettings,FiMenu, FiChevronDown, FiChevronRight} from 'react-icons/fi';
import { FaBuilding, FaTools } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';

const PropertySidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();
  // const [isServiceProviderOpen, setIsServiceProviderOpen] = useState(false);
  // const [hotelDrop, isHotelDrop] = useState(false)

  // // toggle service provider menu dropdown
  // const toggleServiceProvider = () => {
  //   setIsServiceProviderOpen(!isServiceProviderOpen);
  // };

  // // toggle hotel menu deropdown
  // const toggleHotelDrop = () => {
  //   isHotelDrop(!hotelDrop);
  // }

  return (
    <div className={`property_sidebar ${open ? 'open' : 'closed'} ${mobileOpen ? 'mobile-open' : ''}`}>
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
            navigate('/property-owner', {replace: true})
          }}
          open={open}
        />

        <SidebarItem
          icon={<FiHome />}
          text="View Property"
          active={activeTab === 'view-property'}
          onClick={() => {
            onTabChange('view-property')
            navigate('/property-owner/view-properties', {replace: true})
          }}
          open={open}
        />

        <SidebarItem
          icon={<FiHome />}
          text="Add Property"
          active={activeTab === 'add-property'}
          onClick={() => {
            onTabChange('add-property')
            navigate('/property-owner/add-property', {replace: true})
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

        {/* hotel with dropdown
        <div className={`sidebar-dropdown ${hotelDrop ? 'open' : ''}`}>
          <div 
            className={`sidebar-item ${activeTab.startsWith('service-provider') ? 'active' : ''}`}
            onClick={toggleHotelDrop}
          >
            <div className="sidebar-icon"><FaBuilding /></div>
            {open && (
              <>
                <span>Manage Hotels</span>
                {isHotelDrop ? <FiChevronDown /> : <FiChevronRight />}
              </>
            )}
          </div>
          
          {open && hotelDrop && (
            <div className="sidebar-submenu">
              <SidebarItem
                text="Add Hotel"
                active={activeTab === 'service-provider-approved'}
                onClick={() => {
                  onTabChange('add-hotel')
                  navigate('/admin/hotel', {replace: true})
                }}
                open={open}
                isSubItem
              />
              <SidebarItem
                text="Manage"
                active={activeTab === 'view-manage-hotels'}
                onClick={() => {
                  onTabChange('view-manage-hotels')
                  navigate('/admin/manage-hotels', {replace: true})
                }}
                open={open}
                isSubItem
              />
            </div>
          )}
        </div> */}

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

export default PropertySidebar;