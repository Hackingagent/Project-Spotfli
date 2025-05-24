import React, { useState } from 'react'
import './register.css';
import register from '../../../assets/register.jpg';
import Navbar from '../../navbar/VisitorNav';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../api/user/auth';
const Register = () => {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
    confirm_pass: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log(formData);

    try {
      const response = await registerUser(formData)
      console.log('Registration successful', response);
    } catch (error) {
      setError(error.message || 'Registration failed');
    }finally{
      setIsLoading(false);
    }

    


  }

  return (
    <>
      <Navbar />
      <div className='register-container'>
        <div className="register">
          <div className="register-form-container">
              <div className="register-img">
                  <img src={register} alt="" />
              </div>
              <div className="register-form">
                  <h2>Property Seeker <i className="fa fa-search"></i></h2>
                  <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}
                      <label htmlFor="first_name">First Name:</label>
                      <input type="text" name='first_name' value={formData.first_name} id='first_name' onChange={handleChange} placeholder='first name' required/>

                      <label htmlFor="username">Last Name:</label>
                      <input type="text" name='last_name' value={formData.last_name} id='last_name' onChange={handleChange} placeholder='last name' required/>

                      <label htmlFor="email">Email:</label>
                      <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='me123@gmail.com' required/>

                      <div className="gender">
                          <label htmlFor="male">Male:</label>
                          <input  type="radio" name='gender' value="male" onChange={handleChange} />

                          <label htmlFor="male">Female:</label>
                          <input type="radio" name='gender' value="female" onChange={handleChange} />
                      </div>

                      <label htmlFor="username">Date Of Birth</label>
                      <input type="date" name='dob' value={formData.dob} onChange={handleChange} required/>

                      <label htmlFor="password">Password:</label>
                      <input type="password" name='password' value={formData.password} onChange={handleChange} required/>

                      <label htmlFor="confirm-pass">Confirm Password:</label>
                      <input type="password" name='confirm_pass' value={formData.confirm_pass} onChange={handleChange} required/>

                      <div className="terms-conditions">
                          <input type="checkbox" required/> 
                          <span>Agreed to SPOTFLI <a href="">Terms and Conditions</a></span>
                      </div>
                      <button className="register-btn" type='submit' disabled={isLoading} >{isLoading? 'Registering...' : 'Register'}</button>
                  </form>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
