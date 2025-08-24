import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './HotelDashboard.css';

const HotelDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('hotelToken');
    if (!token) {
      navigate('/hotel/login');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) return <div className="hoteldash-loading">Loading...</div>;

  return (
    <div className="hoteldash-main-container">
      <Outlet />
    </div>
  );
};

export default HotelDashboard;