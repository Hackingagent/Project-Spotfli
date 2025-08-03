// src/components/ModernPropertyDashboard.jsx
import React from 'react';
import { 
  FaHome, FaEnvelope, FaDollarSign, FaUsers, 
  FaMapMarkerAlt, FaCalendarAlt, FaChevronRight,
  FaBuilding, FaChartBar, FaFileAlt
} from 'react-icons/fa';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './property-dashboard.css';

const PropertyDashboard = () => {
  // Dashboard data
  const metrics = [
    { icon: <FaHome className="metric-icon" />, value: 12, label: 'Total Properties', trend: 'up' },
    { icon: <FaEnvelope className="metric-icon" />, value: 8, label: 'New Enquiries', trend: 'down' },
    { icon: <FaDollarSign className="metric-icon" />, value: '$34,500', label: 'Monthly Revenue', trend: 'up' },
    { icon: <FaUsers className="metric-icon" />, value: 9, label: 'Active Tenants', trend: 'stable' }
  ];

  const properties = [
    { id: 1, name: 'Oceanview Villa', location: 'Malibu', status: 'occupied', value: '$1.2M', image: 'villa.jpg' },
    { id: 2, name: 'Urban Loft', location: 'New York', status: 'available', value: '$850K', image: 'loft.jpg' },
    { id: 3, name: 'Mountain Cabin', location: 'Aspen', status: 'maintenance', value: '$620K', image: 'cabin.jpg' }
  ];

  const activity = [
    { id: 1, type: 'New Lease', property: 'Oceanview Villa', date: '2023-06-15', tenant: 'Alex Johnson' },
    { id: 2, type: 'Maintenance', property: 'Mountain Cabin', date: '2023-06-12', tenant: 'Service Request' },
    { id: 3, type: 'Inspection', property: 'Urban Loft', date: '2023-06-10', tenant: 'Property Manager' }
  ];

  // Chart data
  const occupancyData = {
    labels: ['Occupied', 'Available', 'Maintenance'],
    datasets: [{
      data: [8, 3, 1],
      backgroundColor: ['#0f7bcd', '#4CAF50', '#FF9800'],
      borderWidth: 0
    }]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [22000, 25500, 28000, 31000, 29500, 34500],
      borderColor: '#0f7bcd',
      backgroundColor: 'rgba(15, 123, 205, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="modern-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Property Portfolio</h1>
        <div className="header-actions">
          <button className="action-btn secondary">
            <FaFileAlt /> Generate Report
          </button>
          <button className="action-btn primary">
            <FaBuilding /> Add Property
          </button>
        </div>
      </header>

      {/* Key Metrics */}
      <section className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon-container">
              {metric.icon}
            </div>
            <div className="metric-content">
              <h3>{metric.value}</h3>
              <p>{metric.label}</p>
              <span className={`trend ${metric.trend}`}>
                {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Row */}
      <section className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Occupancy Status</h3>
            <select className="time-selector">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="chart-container">
            <Pie data={occupancyData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Revenue Trend</h3>
            <select className="time-selector">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="chart-container">
            <Line data={revenueData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </section>

      {/* Properties & Activity */}
      <section className="content-columns">
        <div className="properties-section">
          <div className="section-header">
            <h2>Your Properties</h2>
            <button className="view-all">
              View All <FaChevronRight />
            </button>
          </div>
          <div className="properties-list">
            {properties.map(property => (
              <div key={property.id} className="property-item">
                <div className="property-image" style={{ backgroundImage: `url(${property.image})` }}>
                  <span className={`status-badge ${property.status}`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                <div className="property-details">
                  <h4>{property.name}</h4>
                  <p><FaMapMarkerAlt /> {property.location}</p>
                  <div className="property-value">{property.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="view-all">
              View All <FaChevronRight />
            </button>
          </div>
          <div className="activity-list">
            {activity.map(item => (
              <div key={item.id} className="activity-item">
                <div className="activity-icon">
                  {item.type === 'New Lease' ? <FaFileAlt /> : 
                   item.type === 'Maintenance' ? <FaHome /> : <FaChartBar />}
                </div>
                <div className="activity-details">
                  <h4>{item.type}</h4>
                  <p>{item.property}</p>
                  <div className="activity-meta">
                    <span><FaCalendarAlt /> {item.date}</span>
                    <span>{item.tenant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDashboard;