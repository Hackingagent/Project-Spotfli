import React, { useState, useEffect } from "react";
import MyServiceCard from "../../statcard/MyServiceCard";
import ServiceProviderApplication from "../../account-billing/account/ServiceProviderAppication";
import styles from "./myServices.module.css";
import { getService } from "../../../api/user/serviceProvider/my-service";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getService();
      console.log("MyServices response:", response); 
      
      if (response.success) {
        // Updated to handle the new response structure
        const servicesData = response.services || response.service || [];
        setServices(servicesData);
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error("Fetch services error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [refreshTrigger]);

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  }

  // Function to refresh services after successful application
  const handleServiceApplicationSuccess = () => {
    setRefreshTrigger(prev => prev + 1); 
  };

  return (
    <div className={styles.adminServices}>
      <div className="hoteldash-rooms-header">
        <h1>My Services</h1>
        <button
          className="btn btn-primary"
          onClick={toggle}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : '+ Apply For New Service'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          Error: {error}
          <button onClick={fetchServices} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="hoteldash-room-types">
        {isLoading && services.length === 0 ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services found. Create your first service!</p>
        ) : (
          services.map((service) => (
            <MyServiceCard                                              
              key={service._id}
              id={service._id}
              service={service}
            />
          ))
        )}
      </div>

      {isModalOpen && (
        <ServiceProviderApplication 
          toggleUpdatePanel={toggle}
          onApplicationSuccess={handleServiceApplicationSuccess}
        />
      )}
    </div>
  );
};

export default MyServices;