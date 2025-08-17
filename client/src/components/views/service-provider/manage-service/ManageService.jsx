import React, { useState, useEffect } from "react";
// import service1 from "../../assets/service images/service1.jpg";
// import styles from "./ManageService.module.css";
import ServiceOfferForm from "./ServiceOfferForm";
import { createMyService } from "../../../../api/user/serviceProvider/my-service";
import MyServiceCard from "../../../statcard/MyServiceCard";

const ManageService = ({ onEdit, onDelete }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateService = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createMyService(formData);
      console.log("Creation response:", response);

      if (response.success) {
        // Ensure we're working with the correct data structure
        const newService = response.data?.service || response.data || response;

        if (!newService._id) {
          console.warn("Created service missing ID:", newService);
          throw new Error("Service creation response incomplete");
        }

        setServices((prev) => [...prev, newService]);
        setShowForm(false);
      } else {
        setError(response.error || "Failed to create service");
      }
    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message || "An error occurred while creating service");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="hoteldash-rooms-header">
        <h1>Manage Offers</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "+ Post New Offers"}
        </button>
      </div>

      {error && <div className="#">{error}</div>}

      <div className="#">
        {isLoading && services.length === 0 ? (
          <p>Loading service offers...</p>
        ) : services.length === 0 ? (
          <p>No service offers found. Create your first offer!</p>
        ) : (
          services.map((offer) => (
            <div key={offer._id}>
              <h3>{offer.name || "Untitled Service"}</h3>
              <p>Price: {offer.pricePerDay} XAF/day</p>
              <p>Experience: {offer.experience} years</p>
              <p>Contact: {offer.tell}</p>
            </div>
            // <MyServiceCard
            // key={offer._id}
            // id = {offer._id}
            // service={offer}
            // // onEdit={() => {
            // //   setCurrentOffers(offer);
            // //   setIsModalOpen(true);
            // // }}
            // // onDelete={() => handleDelete(offer._id)}
            // />
          ))
        )}
      </div>

      {showForm && (
        <ServiceOfferForm
          onSubmit={handleCreateService}
          onClose={() => {
            setShowForm(false);
            setError(null);
          }}
          isLoading={isLoading}
        />
      )}
      {/* 
      <div className="hoteldash-room-card">
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div> */}
    </>
  );
};

export default ManageService;
