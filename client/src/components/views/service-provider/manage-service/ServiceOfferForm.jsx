import React, { useState, useEffect } from "react";
import styles from "./ServiceOfferForm.module.css";

const ServiceOfferForm = ({ onClose, onSubmit, isLoading, userServices }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    experience: "",
    service: "",
    userServiceId: "",
    images: [],
    availability: {
      days: [],
      startTime: "",
      endTime: ""
    }
  });

  const [error, setError] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Set default service if user has only one approved service
  useEffect(() => {
    if (userServices && userServices.length === 1) {
      const service = userServices[0];
      setFormData(prev => ({
        ...prev,
        service: service.service?._id || "",
        userServiceId: service._id
      }));
    }
  }, [userServices]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('availability.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        availability: {
          ...prev.availability,
          [field]: value
        }
      }));
    } else if (name === 'service') {
      // When service is selected, find the corresponding userServiceId
      const selectedService = userServices.find(s => s.service?._id === value);
      setFormData(prev => ({
        ...prev,
        service: value,
        userServiceId: selectedService ? selectedService._id : ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'experience'
          ? value === '' ? '' : isNaN(value) ? prev[name] : Number(value)
          : value
      }));
    }
  };

  const handleDayToggle = (day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    setSelectedDays(newSelectedDays);
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: newSelectedDays
      }
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      images: files,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!formData.title || !formData.description || !formData.price || !formData.experience) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.service || !formData.userServiceId) {
      setError("Please select a service");
      return;
    }

    if (formData.images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('userServiceId', formData.userServiceId);
      
      // Append availability data
      if (formData.availability.days.length > 0) {
      // Append each day individually
      formData.availability.days.forEach(day => {
        formDataToSend.append('availability[days][]', day);
      });
    }
    
    if (formData.availability.startTime) {
      formDataToSend.append('availability[startTime]', formData.availability.startTime);
    }
    
    if (formData.availability.endTime) {
      formDataToSend.append('availability[endTime]', formData.availability.endTime);
    }


      // Append all image files
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      // Call the onSubmit prop with the form data
      await onSubmit(formDataToSend);

    } catch (error) {
      console.log("Submission error:", error);
      setError(error.message || "Failed to save offer");
    } 
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalHeader}>Create New Offer</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Service Selection Dropdown */}
          {userServices && userServices.length > 0 && (
            <div className={styles.formGroup}>
              <label>Select Service *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Choose a service</option>
                {userServices.map((userService) => (
                  <option key={userService._id} value={userService.service?._id}>
                    {userService.service?.name || userService.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Offer Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Professional Roofing Service"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Describe your service in detail..."
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Price Per Day (XAF) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                placeholder="0.00"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Experience (Years) *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                max="50"
                required
                placeholder="0"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Availability Days</label>
            <div className={styles.daysContainer}>
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  type="button"
                  className={`${styles.dayButton} ${
                    selectedDays.includes(day) ? styles.dayButtonSelected : ''
                  }`}
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Start Time</label>
              <input
                type="time"
                name="availability.startTime"
                value={formData.availability.startTime}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>End Time</label>
              <input
                type="time"
                name="availability.endTime"
                value={formData.availability.endTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Service Images * (Max 5)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              multiple
              required
            />
            <small>Select up to 5 images of your work</small>
            {formData.images.length > 0 && (
              <small>{formData.images.length} file(s) selected</small>
            )}
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose} 
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceOfferForm;