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
    <div><h2>HOTEL DASHBOARD</h2></div>
  );
};

export default HotelDashboard;

