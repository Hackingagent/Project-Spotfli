import { useEffect, useState } from 'react';
import './HotelOverview.css';

const HotelOverview = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookingsToday: 0,
    revenue: 0
  });

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      // Replace with actual API calls
      setStats({
        totalRooms: 42,
        availableRooms: 15,
        bookingsToday: 8,
        revenue: 12500
      });
    };
    fetchData();
  }, []);

  return (
    <div className="hoteldash-overview">
      <h2>Hotel Overview</h2>
      <div className="hoteldash-stats-grid">
        <div className="hoteldash-stat-card">
          <h3>Total Rooms</h3>
          <p>{stats.totalRooms}</p>
        </div>
        <div className="hoteldash-stat-card">
          <h3>Available Rooms</h3>
          <p>{stats.availableRooms}</p>
        </div>
        <div className="hoteldash-stat-card">
          <h3>Today's Bookings</h3>
          <p>{stats.bookingsToday}</p>
        </div>
        <div className="hoteldash-stat-card">
          <h3>Monthly Revenue</h3>
          <p>${stats.revenue.toLocaleString()}</p>
        </div>
      </div>
      {/* Add more overview components */}
    </div>
  );
};

export default HotelOverview;