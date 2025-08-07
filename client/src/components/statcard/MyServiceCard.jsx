import React from 'react';
import service1 from '../../assets/service images/service1.jpg'
import styles from './MyServiceCard.module.css';

const MyServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="hoteldash-room-card">
      <img src = {service1} alt='Service-Image' />
      <div className={styles.cardHeader}>
        <h3>{service.name}</h3>
    
         <div className={styles.cardBody}>
          <span className="price">${service.price}</span>
          <span>{service.category}</span>
          <span>{service.avialalibilty}</span>
        </div>
      </div>
       

      <div className="hoteldash-room-actions">
        <button>Manage</button>
        {/* <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button> */}
      </div>
    </div>
  );
};

export default MyServiceCard;