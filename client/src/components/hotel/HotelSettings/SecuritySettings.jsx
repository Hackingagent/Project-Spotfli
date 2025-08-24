import { useState } from 'react';
import { updatePassword } from '../../../api/hotel/hotelApi';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear messages when typing
    if (success || error) {
      setSuccess('');
      setError('');
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword.trim()) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const response = await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      if (response.success) {
        setSuccess('Password updated successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="security-settings-container">
      <h2 className="security-settings-header">Security Settings</h2>
      
      {success && (
        <div className="alert-success">
          <i className="fas fa-check-circle"></i>
          {success}
        </div>
      )}
      
      {error && (
        <div className="alert-error">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="security-settings-form">
        <div className={`form-group ${errors.currentPassword ? 'has-error' : ''}`}>
          <label>Current Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
            <i className="fas fa-lock"></i>
          </div>
          {errors.currentPassword && (
            <span className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {errors.currentPassword}
            </span>
          )}
        </div>
        
        <div className={`form-group ${errors.newPassword ? 'has-error' : ''}`}>
          <label>New Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password (min 8 characters)"
            />
            <i className="fas fa-key"></i>
          </div>
          {errors.newPassword && (
            <span className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {errors.newPassword}
            </span>
          )}
        </div>
        
        <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
          <label>Confirm New Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
            />
            <i className="fas fa-redo"></i>
          </div>
          {errors.confirmPassword && (
            <span className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {errors.confirmPassword}
            </span>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Updating...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> Update Password
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="password-strength-tips">
        <h4>Password Requirements:</h4>
        <ul>
          <li>Minimum 8 characters</li>
          <li>Include uppercase and lowercase letters</li>
          <li>Include at least one number</li>
          <li>Consider using special characters</li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritySettings;