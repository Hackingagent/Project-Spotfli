import React, { useState } from 'react';
import { FaHotel, FaBed, FaMoneyBillWave, FaUsers, FaChartLine, FaCalendarAlt, FaBell, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './hotelDashboard.css';

const HotelDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New booking received for Room 203', time: '10 mins ago', read: false },
    { id: 2, message: 'Payment received from John Doe', time: '1 hour ago', read: true },
    { id: 3, message: 'Room 105 maintenance scheduled', time: '2 days ago', read: true }
  ]);

  // Sample data
  const stats = [
    { title: 'Total Rooms', value: '42', icon: <FaBed />, color: 'var(--bg-1)' },
    { title: 'Occupied', value: '28', icon: <FaHotel />, color: 'var(--bg-3)' },
    { title: 'Available', value: '14', icon: <FaBed />, color: 'var(--bg-4)' },
    { title: 'Revenue', value: '$24,580', icon: <FaMoneyBillWave />, color: 'var(--bg-2)' }
  ];

  const recentBookings = [
    { id: 1, guest: 'John Smith', room: '203', checkIn: '2023-06-15', checkOut: '2023-06-18', status: 'Confirmed' },
    { id: 2, guest: 'Sarah Johnson', room: '105', checkIn: '2023-06-16', checkOut: '2023-06-20', status: 'Confirmed' },
    { id: 3, guest: 'Michael Brown', room: '301', checkIn: '2023-06-18', checkOut: '2023-06-22', status: 'Pending' },
    { id: 4, guest: 'Emily Davis', room: '204', checkIn: '2023-06-19', checkOut: '2023-06-21', status: 'Confirmed' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  return (
    <div className={`hotel-dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2><FaHotel /> Hotel Admin</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine />  {sidebarOpen && 'Dashboard'}
          </button>
          <button 
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt />  {sidebarOpen && 'Bookings'}
          </button>
          <button 
            className={`nav-item ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <FaBed /> {sidebarOpen && 'Rooms'}
          </button>
          <button 
            className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <FaMoneyBillWave /> {sidebarOpen && 'Payments'}
          </button>
          <button 
            className={`nav-item ${activeTab === 'guests' ? 'active' : ''}`}
            onClick={() => setActiveTab('guests')}
          >
            <FaUsers />  {sidebarOpen && 'Guests'}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        
        <header className="top-nav">

          {/* {sidebarOpen ? <FaTimes /> : <FaBars />} */}
          <div className="search-and-menu">
         { !sidebarOpen &&  <div className="menu-con">
            <button className="h-menu" onClick={toggleSidebar}>
              <span>MENU</span>
            </button>
          </div> }
          
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          </div>
          
          <div className="user-actions">
            <div className="notifications">
              <FaBell />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
              <div className="notifications-dropdown">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <p>{notification.message}</p>
                    <span>{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <span>Admin User</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1 className="page-title">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'bookings' && 'Manage Bookings'}
            {activeTab === 'rooms' && 'Room Management'}
            {activeTab === 'payments' && 'Payment Records'}
            {activeTab === 'guests' && 'Guest Information'}
          </h1>

          {/* Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                    <div className="stat-icon" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-info">
                      <h3>{stat.value}</h3>
                      <p>{stat.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div className="recent-bookings">
                <h2>Recent Bookings</h2>
                <div className="bookings-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.guest}</td>
                          <td>{booking.room}</td>
                          <td>{booking.checkIn}</td>
                          <td>{booking.checkOut}</td>
                          <td>
                            <span className={`status-badge ${booking.status.toLowerCase()}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td>
                            <button className="action-btn view">View</button>
                            <button className="action-btn edit">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Occupancy Chart (Placeholder) */}
              <div className="chart-container">
                <h2>Occupancy Rate</h2>
                <div className="chart-placeholder">
                  [Occupancy Chart Would Appear Here]
                </div>
              </div>
            </>
          )}

          {/* Bookings Management */}
          {activeTab === 'bookings' && (
            <div className="tab-content">
              <h2>All Bookings</h2>
              <p>Booking management content would go here</p>
            </div>
          )}

          {/* Rooms Management */}
          {activeTab === 'rooms' && (
            <div className="tab-content">
              <h2>Room Inventory</h2>
              <p>Room management content would go here</p>
            </div>
          )}

          {/* Payments Management */}
          {activeTab === 'payments' && (
            <div className="tab-content">
              <h2>Payment Records</h2>
              <p>Payment management content would go here</p>
            </div>
          )}

          {/* Guests Management */}
          {activeTab === 'guests' && (
            <div className="tab-content">
              <h2>Guest Information</h2>
              <p>Guest management content would go here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDashboard;

