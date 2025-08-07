import React, { useState } from 'react';
import login from '../../assets/hotelloginpic.png';
import '../register/propertySeeker/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginHotel } from '../../api/hotel/hotelApi'; // We'll create this

const HotelLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginHotel(formData);
      
      // Store hotel token and data
      localStorage.setItem('hotelToken', response.token);
      localStorage.setItem('hotelData', JSON.stringify(response.hotel));
      
      // Redirect to hotel dashboard
      navigate('/hotel');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <div>
      <div className='register-container'>
        <div className="register">
          <div className="register-form-container">
            <div className="register-img">
              <img src={login} alt="Hotel Login" />
            </div>
            <div className="register-form">
              <h2> Hotel Sign In Form <i className="fa fa-user"></i></h2>
              <form onSubmit={handleSubmit}>
                {error && <div className="error"> 
                  <i className='fa fa-times-circle' id='error-icon'></i>
                  {error}
                </div>}

                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  placeholder='hotel@example.com' 
                  name='email' 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                />

                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  name='password' 
                  value={formData.password} 
                  onChange={handleChange}
                  required
                />
                
                <button 
                  className="register-btn" 
                  disabled={isLoading} 
                  type="submit"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'} 
                  <i className="fa fa-user"></i>
                </button>
                
                <div className="login-links">
                  <Link to="/forgot-password">Forgot Password?</Link>
                  <span> | </span>
                  <Link to="/hotel/register">Register Hotel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelLogin;