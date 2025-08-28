import React, { useState, useEffect } from "react";
import ServiceOfferForm from "./ServiceOfferForm";
import { createOffer, deleteOffer, getService, getOffer } from "../../../../api/user/serviceProvider/my-service";
import styles from "./ManageService.module.css"; // Import CSS module
import OfferCard from "../../../statcard/OfferCard";

const ManageService = () => {
  const [offers, setOffers] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingOffers, setIsFetchingOffers] = useState(true);
  const [isFetchingServices, setIsFetchingServices] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchOffers();
  }, []);

  const fetchServices = async () => {
    setIsFetchingServices(true);
    setError(null);
    try {
      const data = await getService();
      const servicesArray = data.service || [];
      const approvedServices = servicesArray.filter(service => service.status === "approved");
      setUserServices(approvedServices);
      
      if (approvedServices.length === 0) {
        setError("You need to have at least one approved service to create offers");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching your services");
    } finally {
      setIsFetchingServices(false);
    }
  };

  const fetchOffers = async () => {
    setIsFetchingOffers(true);
    setError(null);
    try {
      const response = await getOffer();
      if (response.success) {
        setOffers(response.offers || response.data || []);
      } else {
        setError(response.error || "Failed to fetch offers");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching offers");
    } finally {
      setIsFetchingOffers(false);
    }
  };

  const handleCreateOffer = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createOffer(formData);
      if (response.success) {
        await fetchOffers();
        setShowForm(false);
      } else {
        setError(response.error || "Failed to create offer");
      }
    } catch (error) {
      setError(error.message || "An error occurred while creating offer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await deleteOffer(offerId);
      if (response.success) {
        setOffers(prev => prev.filter(offer => offer._id !== offerId));
      } else {
        setError(response.error || "Failed to delete offer");
      }
    } catch (error) {
      setError(error.message || "An error occurred while deleting offer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditOffer = (offer) => {
    // Implement edit functionality here
    console.log("Edit offer:", offer);
    // You can set state to show an edit modal/form
  };

  const canCreateOffer = userServices.length > 0;
  const isFetching = isFetchingOffers || isFetchingServices;

  return (
    <div className={styles.manageService}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Offers</h1>
        <button
          className={styles.createButton}
          onClick={() => setShowForm(true)}
          disabled={isLoading || !canCreateOffer}
          title={!canCreateOffer ? "You need an approved service to create offers" : ""}
        >
          {isLoading ? "Loading..." : "+ Post New Offers"}
        </button>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>
            ×
          </button>
        </div>
      )}

      {!isFetchingServices && userServices.length === 0 && (
        <div className={styles.warningAlert}>
          <strong>No Approved Services</strong>
          <p>You need to have at least one approved service before you can create offers.</p>
        </div>
      )}

      <div className={styles.offersContainer}>
        {isFetching ? (
          <div className={styles.loadingState}>
            <p>Loading service offers...</p>
          </div>
        ) : offers.length === 0 ? (
          <div className={styles.emptyState}>
            {canCreateOffer ? (
              <>
                <p className={styles.emptyText}>No service offers found.</p>
                <button 
                  className={styles.createFirstButton}
                  onClick={() => setShowForm(true)}
                >
                  Create your first offer!
                </button>
              </>
            ) : (
              <p className={styles.emptyText}>
                You need an approved service to create offers.
              </p>
            )}
          </div>
        ) : (
          <div className={styles.offersGrid}>
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                onEdit={handleEditOffer}
                onDelete={handleDeleteOffer}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ServiceOfferForm
          onSubmit={handleCreateOffer}
          onClose={() => {
            setShowForm(false);
            setError(null);
          }}
          isLoading={isLoading}
          userServices={userServices}
        />
      )}
    </div>
  );
};

export default ManageService;