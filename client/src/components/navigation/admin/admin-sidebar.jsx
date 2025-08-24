import React, { useState } from 'react';
import {FiHome,FiUsers,FiCheckCircle,FiDollarSign,FiPieChart,FiAlertTriangle,FiSettings,FiMenu, FiChevronDown, FiChevronRight} from 'react-icons/fi';
import { FaBuilding, FaTools } from "react-icons/fa";
import { replace, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();
  const [isServiceProviderOpen, setIsServiceProviderOpen] = useState(false);
  const [hotelDrop, isHotelDrop] = useState(false)
  const [isPropertyOpen, setIsPropertyOpen] = useState(false)

  // toggle service provider menu dropdown
  const toggleServiceProvider = () => {
    setIsServiceProviderOpen(!isServiceProviderOpen);
  };  
  
  // toggle Properties menu dropdown
  const toggleProperties = () => {
    setIsPropertyOpen(!isPropertyOpen);
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
            navigate('/admin', {replace: true})
          }}
          open={open}
        />


        <div className={`sidebar-dropdown ${isPropertyOpen ? 'open' : ''}`}>
          <div 
            className={`sidebar-item ${activeTab.startsWith('service-provider') ? 'active' : ''}`}
            onClick={toggleProperties}
          >
            <div className="sidebar-icon"><FiHome /></div>
            {open && (
              <>
                <span>Properties</span>
                {isPropertyOpen ? <FiChevronDown /> : <FiChevronRight />}
              </>
            )}
          </div>
          
          {open && isPropertyOpen && (
            <div className="sidebar-submenu">
              <SidebarItem
                text="Approved"
                active={activeTab === 'property-approved'}
                onClick={() => {
                  onTabChange('property-approved')
                  navigate('/admin/properties/approved', {replace: true})
                }}
                open={open}
                isSubItem
              />
              <SidebarItem
                text="Pending"
                active={activeTab === 'property-pending'}
                onClick={() => {
                  onTabChange('property-pending')
                  navigate('/admin/properties/pending', {replace: true})
                }}
                open={open}
                isSubItem
              />
              <SidebarItem
                text="Declined"
                active={activeTab === 'property-declined'}
                onClick={() => {
                  onTabChange('property-declined')
                  navigate('/admin/properties/declined', {replace: true})
                }}
                open={open}
                isSubItem
              />
            </div>
          )}
        </div>

        
        {/* Service Provider with dropdown */}
        <div className={`sidebar-dropdown ${isServiceProviderOpen ? 'open' : ''}`}>
          <div 
            className={`sidebar-item ${activeTab.startsWith('service-provider') ? 'active' : ''}`}
            onClick={toggleServiceProvider}
          >
            <div className="sidebar-icon"><FiHome /></div>
            {open && (
              <>
                <span>Service Provider</span>
                {isServiceProviderOpen ? <FiChevronDown /> : <FiChevronRight />}
              </>
            )}
          </div>
          
          {open && isServiceProviderOpen && (
            <div className="sidebar-submenu">
              <SidebarItem
                text="Approved"
                active={activeTab === 'service-provider-approved'}
                onClick={() => {
                  onTabChange('service-provider-approved')
                  navigate('/admin/service-provider/approved', {replace: true})
                }}
                open={open}
                isSubItem
              />
              <SidebarItem
                text="Pending"
                active={activeTab === 'service-provider-pending'}
                onClick={() => {
                  onTabChange('service-provider-pending')
                  navigate('/admin/service-provider/pending', {replace: true})
                }}
                open={open}
                isSubItem
              />
              <SidebarItem
                text="Declined"
                active={activeTab === 'service-provider-declined'}
                onClick={() => {
                  onTabChange('service-provider-declined')
                  navigate('/admin/service-provider/declined', {replace: true})
                }}
                open={open}
                isSubItem
              />
            </div>
          )}
        </div>

        <SidebarItem
          icon={<FaTools />}
          text="Services"
          active={activeTab === 'services'}
          onClick={() => {
            onTabChange('services')
            navigate('/admin/services', {replace: true})
          }}
          open={open}
        />

        <SidebarItem
          icon={<FiSettings />}
          text="Categories"
          active={activeTab === 'categories'}
          onClick={() => {
            onTabChange('categories')
            navigate('/admin/category', {replace: true})
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

        {/* hotel with dropdown */}
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
        </div>

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

export default AdminSidebar;