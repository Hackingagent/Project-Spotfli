import { useState } from 'react';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Simulate API call
      setTimeout(() => {
        setSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
    }
  };

  return (
    <div className="hoteldash-security">
      <h2>Security Settings</h2>
      <form onSubmit={handleSubmit} className="hoteldash-security-form">
        {success && (
          <div className="hoteldash-alert-success">
            Password updated successfully!
          </div>
        )}
        
        <div className="hoteldash-form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={errors.currentPassword ? 'error' : ''}
          />
          {errors.currentPassword && (
            <span className="hoteldash-error">{errors.currentPassword}</span>
          )}
        </div>
        
        <div className="hoteldash-form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={errors.newPassword ? 'error' : ''}
          />
          {errors.newPassword && (
            <span className="hoteldash-error">{errors.newPassword}</span>
          )}
        </div>
        
        <div className="hoteldash-form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="hoteldash-error">{errors.confirmPassword}</span>
          )}
        </div>
        
        <div className="hoteldash-form-actions">
          <button type="submit" className="hoteldash-btn-primary">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;