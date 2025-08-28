import { useState } from 'react';
// import { createWalkInBooking } from '../../../api/hotel/hotelApi';
import './css/WalkInBookingModal.css';
import { createBooking } from '../../../api/booking';

const WalkInBookingModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    roomId: '',
    guestInfo: {
      name: '',
      email: '',
      phone: ''
    },
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('guestInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        guestInfo: {
          ...prev.guestInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createBooking(formData);
      if (response.success) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="walkin-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Add Walk-In Booking</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room ID</label>
            <input
              type="text"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Guest Name</label>
            <input
              type="text"
              name="guestInfo.name"
              value={formData.guestInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Guest Email</label>
            <input
              type="email"
              name="guestInfo.email"
              value={formData.guestInfo.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Guest Phone</label>
            <input
              type="tel"
              name="guestInfo.phone"
              value={formData.guestInfo.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Check-In Date</label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Check-Out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
                min={formData.checkInDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalkInBookingModal;