import { useState, useEffect } from 'react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    logo: null,
    previewLogo: ''
  });

  useEffect(() => {
    // Fetch hotel data from API
    const fetchHotelData = async () => {
      // Replace with actual API call
      setTimeout(() => {
        setHotelData({
          name: 'Grand Hotel',
          email: 'contact@grandhotel.com',
          phone: '+1234567890',
          address: '123 Main Street',
          city: 'New York',
          description: 'Luxury hotel in the heart of the city',
          previewLogo: '/path/to/default-logo.jpg'
        });
      }, 500);
    };
    fetchHotelData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHotelData(prev => ({
        ...prev,
        logo: file,
        previewLogo: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to API
    console.log('Submitting:', hotelData);
    // Add API call here
  };

  return (
    <div className="hoteldash-settings">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit} className="hoteldash-settings-form">
        <div className="hoteldash-settings-row">
          <div className="hoteldash-settings-logo">
            <div className="hoteldash-logo-preview">
              <img 
                src={hotelData.previewLogo} 
                alt="Hotel Logo" 
                className="hoteldash-logo-image"
              />
            </div>
            <div className="hoteldash-logo-upload">
              <label htmlFor="logo-upload" className="hoteldash-btn-secondary">
                Change Logo
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <p className="hoteldash-logo-hint">
                Recommended size: 300x300px
              </p>
            </div>
          </div>
          
          <div className="hoteldash-settings-fields">
            <div className="hoteldash-form-group">
              <label>Hotel Name</label>
              <input
                type="text"
                name="name"
                value={hotelData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="hoteldash-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={hotelData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="hoteldash-form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={hotelData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="hoteldash-form-row">
          <div className="hoteldash-form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={hotelData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="hoteldash-form-group">
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
        
        <div className="hoteldash-form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={hotelData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="hoteldash-form-actions">
          <button type="submit" className="hoteldash-btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;