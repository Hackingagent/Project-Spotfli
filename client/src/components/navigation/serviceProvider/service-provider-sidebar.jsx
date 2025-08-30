import React, { useState } from 'react';
import {
  FiHome, FiUsers, FiCheckCircle, FiDollarSign, 
  FiPieChart, FiAlertTriangle, FiSettings, FiMenu, 
  FiChevronDown, FiChevronRight
} from 'react-icons/fi';
import { FaBuilding, FaTools } from "react-icons/fa";
import { replace, useNavigate } from 'react-router-dom';
import styles from './ServiceProviderSidebar.module.css';

const ServiceProviderSidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();
  const [isServiceProviderOpen, setIsServiceProviderOpen] = useState(false);
  const [hotelDrop, isHotelDrop] = useState(false);

  // toggle service provider menu dropdown
  const toggleServiceProvider = () => {
    setIsServiceProviderOpen(!isServiceProviderOpen);
  };

  // toggle hotel menu dropdown
  const toggleHotelDrop = () => {
    isHotelDrop(!hotelDrop);
  }

  return (
    <div className={`${styles.sidebar} ${open ? styles.open : styles.closed} ${mobileOpen ? styles.mobileOpen : ''}`}>
      <div className={styles.sidebarHeader}>
        {open ? (
          <h2 className={styles.sidebarTitle}>SERVICE DASHBOARD</h2>
        ) : (
          <div className={styles.sidebarLogo}>SF</div>
        )}
      </div>
      
      <div className={styles.sidebarMenu}>
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
            navigate('/service-provider/my-booking', {replace: true})
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
      
      <div className={styles.sidebarFooter}>
        <button
          onClick={onToggle}
          className={styles.collapseButton}
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
      className={`${styles.sidebarItem} ${active ? styles.active : ''} ${isSubItem ? styles.subItem : ''}`}
    >
      {icon && <div className={styles.sidebarIcon}>{icon}</div>}
      {open && <span className={styles.sidebarText}>{text}</span>}
      {!open && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default ServiceProviderSidebar;