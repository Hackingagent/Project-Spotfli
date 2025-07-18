import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HotelSidebar from './HotelSidebar';
import HotelTopNav from './HotelTopNav';
import './HotelLayout.css';

const HotelLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`hoteldash-container ${loading ? 'hoteldash-fade-in' : ''}`}>
      <HotelSidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className={`hoteldash-main ${sidebarOpen ? '' : 'hoteldash-sidebar-collapsed'}`}>
        <HotelTopNav toggleSidebar={toggleSidebar} />
        <div className="hoteldash-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HotelLayout;