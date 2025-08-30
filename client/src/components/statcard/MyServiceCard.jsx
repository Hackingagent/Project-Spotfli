import React from "react";
import service1 from "../../assets/service images/no-image.jpg";
import styles from "./MyServiceCard.module.css";
import { Link } from "react-router-dom";

const MyServiceCard = ({ service, onEdit, onDelete, id }) => {
  const serviceId = id || service?.id || service?._id;
  
  // Get the URL from the thumbnail object
  const thumbnailUrl = service?.thumbnail?.url || service1;

  // Get service type name - handle both populated service object and service ID
  const getServiceType = () => {
    if (service.service && typeof service.service === 'object') {
      return service.service.name;
    } else if (service.serviceType) {
      return service.serviceType;
    } else if (service.service) {

      return "Service";
    }
    return "Unknown Service";
  };

  if (!serviceId) {
    console.error("No ID found for service:", service);
    return <div>Error: Service ID missing</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={thumbnailUrl} 
          alt="Service-Image" 
          className={styles.image}
          onError={(e) => {
            // Fallback to default image if thumbnail fails to load
            e.target.src = service1;
          }}
        />
        <div className={`${styles.statusBadge} ${styles[service.status]}`}>
          {service.status}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{service.name}</h3>
          <p className={styles.serviceType}>{getServiceType()}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Status:</span>
            <span className={`${styles.detailValue} ${styles[service.status]}`}>
              {service.status}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Offers:</span>
            <span className={styles.offersValue}>{service.offerCount || 0}</span>
          </div>
          
          {service.experience && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Experience:</span>
              <span className={styles.detailValue}>
                {service.experience} year{service.experience !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Link
            to={`/service-provider/manage-service/${serviceId}`}
            className={styles.manageButton}
          >
            <span>Manage</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          {service.thumbnail?.url && (
            <button 
              className={styles.viewButton}
              onClick={() => window.open(service.thumbnail.url, '_blank')}
            >
              <span>View Image</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyServiceCard;