import React, { useState, useEffect } from 'react';
import './EditRoomModal.css';

const EditRoomModal = ({ room, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'single',
    pricePerNight: '',
    capacity: 1,
    description: '',
    amenities: '',
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // Initialize form with room data
  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        pricePerNight: room.pricePerNight,
        capacity: room.capacity,
        description: room.description,
        amenities: room.amenities?.join(', ') || '',
        images: room.images || []
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleImageDelete = (imagePath) => {
    setImagesToDelete([...imagesToDelete, imagePath]);
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imagePath)
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const formDataToSend = new FormData();
    
    // Append all text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'images' && key !== 'amenities') {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    // Append amenities
    formDataToSend.append('amenities', formData.amenities);
    
    // Append new images
    newImages.forEach(image => {
      formDataToSend.append('images', image);
    });
    
    // Append images to delete as JSON string
    formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));
    
    await onSave(formDataToSend);
    onClose();
  } catch (err) {
    setError(err.message || 'Failed to update room');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="edit-room-modal-overlay">
      <div className="edit-room-modal">
        <button className="edit-room-modal-close" onClick={onClose}>&times;</button>
        <h2>Edit Room</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
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
              <label>Price Per Night ($)</label>
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
            <label>Current Images</label>
            <div className="current-images">
              {formData.images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img 
                    src={`http://localhost:5000/${image}`} 
                    alt={`Room ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/default-room.jpg';
                    }}
                  />
                  <button 
                    type="button" 
                    className="delete-image"
                    onClick={() => handleImageDelete(image)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Add New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <small>Upload up to 5 additional images</small>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;