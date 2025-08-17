import React, { useState } from "react";
import styles from "./ServiceOfferForm.module.css";
const ServiceOfferForm = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerDay: null,
    images: [],
    tell: null,
    days: "",
    experience: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:

      //Convert these fields to numbers
      name === 'tell' || name === 'experience' ||  name === 'pricePerDay'
      ? value === ''
      ? '' 
      : isNaN(value)
      ? prev[name]
      : Number(value) 
      : value
    }));
 
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formDataToSend = new FormData();

      //Append all text fields
      Object.keys(formData).forEach((key) => {
        if(key !== "images" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      //Append all images files
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      //Log form data before sending
      console.log("Form data being sent", {
        ...formData,
        images: formData.images.map((imgm) => imgm.name),
      });

      //Call the Submit prop with the form data
await onSubmit(formDataToSend);

    } catch (error) {
      console.log("Submission error:", error);
      setError(error.message || "Failed to save service offer");
    } 
  };

  return (
    <div className="hoteldash-modal-overlay">
      <div className="hoteldash-modal">
        <button className="hoteldash-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="hoteldash-modal-header">Post New Offers</h2>
        {error && <div className="error-message">{error}</div>}

        <form className="hoteldash-form" onSubmit={handleSubmit}>
          <div className="hoteldash-form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price Per Day (XAF)</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hoteldash-form-group">
            <label>Phone Number</label>
            <input
              type="number"
              name="tell"
              value={formData.tell}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Open Hours</label>
              <input
                type="text"
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Experience Level</label>
              <input
                id="experience"
                type="number"
                name="experience"
                min="0"
                max="30"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label>Service Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="form-actions">
            <button className="#" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button className="#" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceOfferForm;
