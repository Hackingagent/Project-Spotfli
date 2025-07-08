import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';
import StatCard from '../../../statcard/StatCard';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { activeTab } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const stats = {
    totalUsers: 1243,
    verifiedUsers: 876,
    unverifiedUsers: 367,
    propertyOwners: 342,
    serviceProviders: 189,
    pendingProperties: 23,
    pendingServiceProviders: 15,
    activeDisputes: 7
  };

  const recentActivities = [
    { id: 1, type: 'property', action: 'approved', name: 'Luxury Villa in Malibu', time: '2 mins ago' },
    { id: 2, type: 'user', action: 'verified', name: 'John Doe', time: '15 mins ago' },
    { id: 3, type: 'service', action: 'rejected', name: 'Plumbing Services Inc', time: '1 hour ago' },
    { id: 4, type: 'dispute', action: 'resolved', name: 'Payment issue #D-234', time: '3 hours ago' },
    { id: 5, type: 'property', action: 'approved', name: 'Downtown Apartment', time: '5 hours ago' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'property', name: 'Beachfront Condo', submitted: '2 days ago', user: 'Sarah Johnson' },
    { id: 2, type: 'property', name: 'Mountain Cabin', submitted: '1 day ago', user: 'Mike Brown' },
    { id: 3, type: 'service', name: 'AC Repair Services', submitted: '3 days ago', user: 'TechFix LLC' },
    { id: 4, type: 'service', name: 'Interior Design Studio', submitted: '5 hours ago', user: 'DesignHub' },
    { id: 5, type: 'agent', name: 'Lisa Wong', submitted: '1 day ago', user: 'Lisa Wong' },
  ];

  const activeDisputes = [
    { id: 1, property: 'Lakeside Villa', parties: 'James Wilson vs. Elite Agents', issue: 'Payment dispute', opened: '2 days ago' },
    { id: 2, property: 'Urban Loft', parties: 'Maria Garcia vs. City Living', issue: 'Service quality', opened: '1 day ago' },
    { id: 3, property: 'Country House', parties: 'Tom Lee vs. Rural Properties', issue: 'Contract terms', opened: '4 days ago' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Top Navigation */}
      <div className="top-nav">
        <h1>Dashboard</h1>

        <div className="search-and-profile">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="notification-button">
            <FiBell />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile">
            <div className="profile-icon">
              <FiUser />
            </div>
            <span>Admin User</span>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-cards">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="👥"
            color="var(--bg-1)" 
          />
          <StatCard 
            title="Verified Users" 
            value={stats.verifiedUsers} 
            icon="✓"
            color="var(--bg-3)" 
          />
          <StatCard 
            title="Property Owners" 
            value={stats.propertyOwners} 
            icon="🏠"
            color="var(--bg-4)" 
          />
          <StatCard 
            title="Service Providers" 
            value={stats.serviceProviders} 
            icon="👷"
            color="var(--bg-2)" 
          />
        </div>

        {/* Pending Approvals and Recent Activity */}
        <div className="dashboard-row">
          {/* Pending Approvals */}
          <div className="pending-approvals">
            <div className="approvals-header">
              <h3>Pending Approvals</h3>
              <span className="badge">{stats.pendingProperties + stats.pendingServiceProviders} pending</span>
            </div>

            <div className="approval-list">
              {pendingApprovals.map(item => (
                <div key={item.id} className="approval-item">
                  <div>
                    <div className="approval-name">{item.name}</div>
                    <div className="approval-meta">
                      {item.type === 'property' ? 'Property Listing' : 
                       item.type === 'service' ? 'Service Provider' : 'Agent'} • Submitted {item.submitted} by {item.user}
                    </div>
                  </div>
                  <div className="approval-actions">
                    <button className="approve-button">Approve</button>
                    <button className="reject-button">Reject</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="view-all">
              <button>View All Approvals →</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.action}`}>
                    {activity.action === 'approved' || activity.action === 'verified' || activity.action === 'resolved' ? 
                     '✓' : '✕'}
                  </div>
                  <div>
                    <div className="activity-name">{activity.name}</div>
                    <div className="activity-meta">
                      {activity.type === 'property' ? 'Property' : 
                       activity.type === 'user' ? 'User' : 
                       activity.type === 'service' ? 'Service' : 'Dispute'} {activity.action} • {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Disputes */}
        <div className="active-disputes">
          <div className="disputes-header">
            <h3>Active Disputes</h3>
            <span className="badge error">{stats.activeDisputes} active</span>
          </div>

          <div className="disputes-list">
            {activeDisputes.map(dispute => (
              <div key={dispute.id} className="dispute-item">
                <div>
                  <div className="dispute-property">{dispute.property}</div>
                  <div className="dispute-parties">{dispute.parties}</div>
                  <div className="dispute-issue">{dispute.issue}</div>
                </div>
                <div className="dispute-time">
                  Opened {dispute.opened}
                </div>
              </div>
            ))}
          </div>

          <div className="view-all">
            <button>View All Disputes →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;