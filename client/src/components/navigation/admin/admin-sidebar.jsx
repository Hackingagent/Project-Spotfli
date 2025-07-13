import React, { useState } from 'react';
import {FiHome,FiUsers,FiCheckCircle,FiDollarSign,FiPieChart,FiAlertTriangle,FiSettings,FiMenu, FiChevronDown, FiChevronRight} from 'react-icons/fi';
import { FaTools } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();
  const [isServiceProviderOpen, setIsServiceProviderOpen] = useState(false);

  const toggleServiceProvider = () => {
    setIsServiceProviderOpen(!isServiceProviderOpen);
  };

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
        <SidebarItem
          icon={<FiHome />}
          text="Property Owners"
          active={activeTab === 'property-owner'}
          onClick={() => {
            onTabChange('property-owner')
            navigate('/admin', {replace: true})
          }}
          open={open}
        />
        
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

export default AdminSidebar;