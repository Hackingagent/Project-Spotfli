import React, { useState } from 'react';
import './RoomCategoryForm.css';
import axios from 'axios';
const RoomCategoryForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'single',
    pricePerNight: '',
    numAvailable: '',
    capacity: 1, 
    description: '',
    amenities: '',
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      images: Array.from(e.target.files)
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const formDataToSend = new FormData();
    
    // Log form data before sending
    console.log('Form data:', {
      ...formData,
      images: formData.images.map(img => img.name)
    });

    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    formData.images.forEach((image) => {
      formDataToSend.append('images', image); // Remove the index from field name
    });
    console.log('Token:', localStorage.getItem('hotel_token'));

    const response = await axios.post('http://localhost:5000/api/hotel/rooms', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('hotel_token')}`
      }
    });

    console.log('Response:', response); // Log the response
    onSave(response.data);
    onClose();
  } catch (err) {
    console.error('Full error:', err);
    console.error('Error response:', err.response);
    setError(err.response?.data?.message || 
             err.message || 
             'Failed to add room - check console for details');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="hoteldash-modal-overlay">
      <div className="hoteldash-modal">
        <button className="hoteldash-modal-close" onClick={onClose}>&times;</button>
        <h2 className='hoteldash-modal-header '>Add New Room</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className='hoteldash-form' onSubmit={handleSubmit}>
          <div className="hoteldash-form-group">
            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="hoteldash-form-group">
            <label>Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
              <option value="presidential">Presidential</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price Per Night (XAF)</label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>How Many Available</label>
              <input
                type="number"
                name="numAvailable"
                value={formData.numAvailable}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Amenities (comma separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="e.g., WiFi, TV, AC, Mini-bar"
            />
          </div>

          <div className="form-group">
            <label>Room Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <small>Upload up to 5 images</small>
          </div>

          <div className="form-actions">
            <button className='btn' type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button className='btn btn-primary' type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomCategoryForm;