import React, { useEffect, useState } from 'react';
import { FiX, FiUser, FiBriefcase, FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import './ServiceProviderApplication.css';
import { becomeServiceProvider, userGetServices } from '../../../api/user/serviceProvider/service-provider';

const ServiceProviderApplication = ({ toggleUpdatePanel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tell: '',
    experience: '',
    service: '',
    website: '',
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const fetchServices = async() => {
    const response = await userGetServices();

    console.log(response);
    setServices(response.service);
  }

  useEffect(() => {
    fetchServices();
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
  

    try {
      const response = await becomeServiceProvider(formData)

      if(response.success){
        setSubmitSuccess(true);
      }
    } catch (error) {
      setError(error.message);
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
          </div>
        ) : (
          <>
            <div className="spa-modal-header">
              <h2>Become a Service Provider <i className='fa fa-gear'></i></h2>
              <p>Join our network of trusted Service Providers</p>
            </div>

            <form onSubmit={handleSubmit} className="spa-form">

              <div className="spa-form-group">
                <label htmlFor="service">
                  <FiBriefcase className="spa-input-icon" />
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service._id}>{service.name}</option>
                  ))}
                </select>
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
                  Buisness Email (if you have)
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

              <div className="spa-form-group">
                <label htmlFor="website">Portfolio/Website URL (if you have)</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
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
                disabled={isSubmitting || !formData.termsAccepted}
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