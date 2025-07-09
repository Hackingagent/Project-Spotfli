import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-content">
        <div>
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
        </div>
        <div className="stat-icon" style={{ 
          backgroundColor: `${color}20`,
          color: color
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;