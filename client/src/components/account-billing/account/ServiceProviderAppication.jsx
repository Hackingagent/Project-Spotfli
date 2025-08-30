import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiUser, FiBriefcase, FiMail, FiPhone, FiCheck, FiUpload, FiTrash2 } from 'react-icons/fi';
import './ServiceProviderApplication.css';
import { createService, userGetServices,  } from '../../../api/user/serviceProvider/my-service';

const ServiceProviderApplication = ({ toggleUpdatePanel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tell: '',
    experience: '',
    service: '',
    termsAccepted: false
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    setError('');
    setThumbnail(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

const fetchServices = async () => {
  setIsLoadingServices(true);
  setError('');
  try {
    const response = await userGetServices();
    console.log('Services response:', response);
    
    if (response?.success) {
      const receivedServices = response.services || [];
      setServices(Array.isArray(receivedServices) ? receivedServices : []);
    } else {
      setError(response?.error || 'Failed to load services');
    }
  } catch (err) {
    console.error('Service fetch error:', err);
    setError('Failed to load services. Please try again later.');
    setServices([]);
  } finally {
    setIsLoadingServices(false);
  }
};

  useEffect(() => {
    fetchServices();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
    // Create FormData to handle file upload
    const submissionData = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    
    // Append thumbnail if selected
    if (thumbnail) {
      submissionData.append('thumbnail', thumbnail);
    }

    // Use createService API call
    const response = await createService(submissionData);
    console.log('Submission response:', response);
    
    if (response?.success) {
      setSubmitSuccess(true);
      
      setTimeout(() => {
        toggleUpdatePanel();
      }, 2000);
      
    } else {
      setError(response?.error || 'Submission failed. Please try again.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    setError('An unexpected error occurred');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="spa-modal-overlay">
      <div className="spa-modal-container">
        <button className="spa-close-btn" onClick={toggleUpdatePanel}>
          <FiX size={24} />
        </button>

        {submitSuccess ? (
          <div className="spa-success-message">
            <div className="spa-success-icon">
              <FiCheck size={48} />
            </div>
            <h3>Application Submitted!</h3>
            <p>We'll review your information and get back to you soon.</p>
            <button 
              className="spa-close-success-btn"
              onClick={toggleUpdatePanel}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="spa-modal-header">
              <h2>Become a Service Provider <i className='fa fa-gear'></i></h2>
              <p>Join our network of trusted Service Providers</p>
              {error && <div className="spa-error-message">{error}</div>}
            </div>

            <form onSubmit={handleSubmit} className="spa-form" encType="multipart/form-data">
              {/* Thumbnail Upload Section */}
              <div className="spa-form-group">
                <label htmlFor="thumbnail">
                  Service Thumbnail Image
                </label>
                <div className="spa-thumbnail-upload-container">
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    ref={fileInputRef}
                    onChange={handleThumbnailChange}
                    accept="image/*"
                    className="spa-thumbnail-input"
                  />
                  
                  {thumbnailPreview ? (
                    <div className="spa-thumbnail-preview-container">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="spa-thumbnail-preview"
                      />
                      <button 
                        type="button" 
                        className="spa-remove-thumbnail"
                        onClick={removeThumbnail}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="thumbnail" className="spa-thumbnail-upload-area">
                      <FiUpload size={24} />
                      <span>Click to upload or drag and drop</span>
                      <p>PNG, JPG up to 2MB</p>
                    </label>
                  )}
                </div>
              </div>

              <div className="spa-form-group">
                <label htmlFor="service">
                  <FiBriefcase className="spa-input-icon" />
                  Service Type
                </label>
                {isLoadingServices ? (
                  <div className="spa-loading-services">Loading services...</div>
                ) : services.length === 0 ? (
                  <div className="spa-no-services">No services available</div>
                ) : (
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="spa-form-group">
                <label htmlFor="name">
                  <FiUser className="spa-input-icon" />
                  Business Name (if you have)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder='Paul Electronics'
                  onChange={handleChange}
                />
              </div>

              <div className="spa-form-group">
                <label htmlFor="email">
                  <FiMail className="spa-input-icon" />
                  Business Email (if you have)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder='john@gmail.com'
                  onChange={handleChange}
                />
              </div>

              <div className="spa-form-group">
                <label htmlFor="tell">
                  <FiPhone className="spa-input-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="tell"
                  name="tell"
                  value={formData.tell}
                  placeholder='+237 677835443'
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="spa-form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="spa-terms-checkbox">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="termsAccepted">
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="spa-submit-btn"
                disabled={isSubmitting || !formData.termsAccepted || (services.length === 0 && !isLoadingServices)}
              >
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderApplication;