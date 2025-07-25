import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import './admin-layout.css';
import ServiceProviderSidebar from '../../navigation/serviceProvider/service-provider-sidebar';

const ServiceProviderLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="mobile-menu-button"
        >
          {mobileSidebarOpen ? '✕' : '☰'}
        </button>
        <h2>Admin Dashboard</h2>
        <div className="spacer"></div>
      </div>

      {/* Sidebar */}
      <ServiceProviderSidebar 
        open={sidebarOpen} 
        mobileOpen={mobileSidebarOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Outlet context={{ activeTab }} />
      </div>
    </div>
  );
};

export default ServiceProviderLayout;