import React from 'react';

const MyServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="service-card">
      <div className="card-header">
        <h3>{service.name}</h3>
        <span className="price">${service.price}</span>
      </div>
      <div className="card-body">
        <p>{service.description}</p>
        <div className="meta">
          <span>Category: {service.category}</span>
          <span>Duration: {service.duration}</span>
        </div>
      </div>
      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MyServiceCard;