import { useState } from 'react';
import './RoomCategoryForm.css';

const RoomCategoryForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: 2,
    amenities: [],
    totalRooms: 1,
    currentAmenity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addAmenity = () => {
    if (formData.currentAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, prev.currentAmenity.trim()],
        currentAmenity: ''
      }));
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoomType = {
      ...formData,
      id: Date.now(), // Temporary ID until saved to database
      availableRooms: formData.totalRooms,
      price: parseFloat(formData.price),
      capacity: parseInt(formData.capacity),
      totalRooms: parseInt(formData.totalRooms)
    };
    onSave(newRoomType);
  };

  return (
    <div className="hoteldash-modal-overlay">
      <div className="hoteldash-modal">
        <div className="hoteldash-modal-header">
          <h3>Add New Room Type</h3>
          <button onClick={onClose} className="hoteldash-modal-close">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="hoteldash-form">
          <div className="hoteldash-form-group">
            <label>Room Type Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="hoteldash-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          
          <div className="hoteldash-form-row">
            <div className="hoteldash-form-group">
              <label>Price per Night ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                step="0.01"
                required
              />
            </div>
            
            <div className="hoteldash-form-group">
              <label>Capacity</label>
              <select
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} {num > 1 ? 'people' : 'person'}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="hoteldash-form-group">
            <label>Total Rooms</label>
            <input
              type="number"
              name="totalRooms"
              value={formData.totalRooms}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="hoteldash-form-group">
            <label>Amenities</label>
            <div className="hoteldash-amenities-input">
              <input
                type="text"
                value={formData.currentAmenity}
                onChange={(e) => setFormData(prev => ({ ...prev, currentAmenity: e.target.value }))}
                placeholder="Add amenity"
              />
              <button type="button" onClick={addAmenity} className="hoteldash-btn-small">
                Add
              </button>
            </div>
            <div className="hoteldash-amenities-list">
              {formData.amenities.map((amenity, index) => (
                <span key={index} className="hoteldash-amenity-tag">
                  {amenity}
                  <button type="button" onClick={() => removeAmenity(index)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="hoteldash-form-actions">
            <button type="button" onClick={onClose} className="hoteldash-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="hoteldash-btn-primary">
              Save Room Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomCategoryForm;