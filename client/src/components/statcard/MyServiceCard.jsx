import React from "react";
import service1 from "../../assets/service images/service1.jpg";
import styles from "./MyServiceCard.module.css";
import { Link } from "react-router-dom";

const MyServiceCard = ({ service, onEdit, onDelete, id }) => {
  const serviceId = id || service?.id || service?._id;
  //Debug Logging
  console.log({
    serviceId, // The actual ID being used
    navigationPath: `/service-provider/manage-service/${serviceId}`, // The full path
  });

  if (!serviceId) {
    console.error("No ID found for service:", service);
    return <div>Error: Service ID missing</div>;
  }

  return (
    <div className="hoteldash-room-card">
      <img src={service1} alt="Service-Image" />
      <div className={styles.cardHeader}>
        <h3>Name: {service.name}</h3>

        <div className={styles.cardBody}>
          <span className="price">price: ${service.price}</span>
          <span>category: {service.category}</span>
          <span>status: {service.status}</span>
        </div>
      </div>

        <Link
        className="hoteldash-room-actions"
        to={`/service-provider/manage-service/${serviceId}`}
      >
        <button>Manage</button>
      </Link>

      {/* <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button> */}
    </div>
  );
};

export default MyServiceCard;
