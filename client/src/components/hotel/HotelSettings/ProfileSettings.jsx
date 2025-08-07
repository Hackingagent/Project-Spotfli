import { useState, useEffect } from 'react';
// import loader from '../../../assets/preloadoers/Skateboarding.gif';
import loader from '../../../assets/preloadoers/Main Scene.gif';

import { updateHotelProfile, getCurrentHotel } from '../../../api/hotel/hotelApi';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [hotelData, setHotelData] = useState({
    hotelName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    amenities: '',
    images: [],
    newImages: []
  });
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await getCurrentHotel();
        if (response.success && response.hotel) {
          setHotelData({
            hotelName: response.hotel.hotelName,
            email: response.hotel.email,
            phone: response.hotel.phone,
            address: response.hotel.address,
            city: response.hotel.city,
            description: response.hotel.description,
            amenities: response.hotel.amenities?.join(', ') || '',
            images: response.hotel.images || [],
            newImages: []
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setHotelData(prev => ({
      ...prev,
      newImages: files
    }));
  };

  const handleDeleteImage = (imageUrl) => {
    setImagesToDelete([...imagesToDelete, imageUrl]);
    setHotelData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      
      // Append all text fields
      formData.append('hotelName', hotelData.hotelName);
      formData.append('email', hotelData.email);
      formData.append('phone', hotelData.phone);
      formData.append('address', hotelData.address);
      formData.append('city', hotelData.city);
      formData.append('description', hotelData.description);
      formData.append('amenities', hotelData.amenities);
      
      // Append images to delete
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
      
      // Append new images
      hotelData.newImages.forEach(file => {
        formData.append('images', file);
      });

      const response = await updateHotelProfile(hotelData._id, formData);
      
      if (response.success) {
        setSuccess('Profile updated successfully!');
        // Update local state with new data
        setHotelData(prev => ({
          ...prev,
          images: response.hotel.images,
          newImages: []
        }));
        setImagesToDelete([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return  <div className='preloader'><img src={loader} alt="" /></div>;

  return (
    <div className="profile-settings-container">
      <h2 className="profile-settings-header">Hotel Profile Settings</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="profile-settings-form">
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          
          <div className="form-group">
            <label>Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              value={hotelData.hotelName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={hotelData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={hotelData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Location</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={hotelData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={hotelData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Description & Amenities</h3>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={hotelData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>
          
          <div className="form-group">
            <label>Amenities (comma separated)</label>
            <input
              type="text"
              name="amenities"
              value={hotelData.amenities}
              onChange={handleChange}
              placeholder="e.g., Pool, Gym, WiFi, Restaurant"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Hotel Images</h3>
          
          <div className="current-images">
            {hotelData.images.map((image, index) => (
              <div key={index} className="image-preview">
                <img 
                  src={`http://localhost:5000/${image}`} 
                  alt={`Hotel image ${index + 1}`}
                  onError={(e) => {
                    e.target.src = '/default-hotel.jpg';
                  }}
                />
                <button 
                  type="button"
                  className="delete-image-btn"
                  onClick={() => handleDeleteImage(image)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="form-group">
            <label>Add New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="image-upload-input"
            />
            <p className="hint-text">Upload images of your hotel (front view, rooms, amenities, etc.)</p>
            
            {hotelData.newImages.length > 0 && (
              <div className="new-images-preview">
                <p>New images to upload:</p>
                <div className="new-images-list">
                  {hotelData.newImages.map((file, index) => (
                    <div key={index} className="new-image-item">
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;