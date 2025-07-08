import React, { useState } from 'react'
import login from '../../assets/register.jpg'
import '../register/propertySeeker/register.css';
import Navbar from '../navbar/VisitorNav';
import { Link, } from 'react-router-dom';
import { loginUser } from '../../api/user/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = new useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await loginUser(formData.email, formData.password);
      console.log('Login successful', response);

      if(response.isUser){
        if(response.success){
          navigate('/', {replace: true});
        }else{
          setError(response.message)
        }
      }

      if(response.isAdmin){
        if(response.success){
          navigate('/register', {replace: true});
        }else{
          setError(response.message)
        }
      }
      


    } catch (error) {
      setError(error.message || 'Login failed');
    }finally{
      setIsLoading(false);
    }

    


  }
  return (
    <div>
        <>
            <Navbar />
            <div className='register-container'>
            <div className="register">
                <div className="register-form-container">
                    <div className="register-img">
                        <img src={login} alt="" />
                    </div>
                    <div className="register-form">
                        <h2> Sign In <i className="fa fa-user"></i></h2>
                        <form onSubmit={handleSubmit}>
                            {error && <div className="error"> <i className='fa fa-times-circle' id='error-icon'></i>{error}</div>}

                            <label htmlFor="emial">Email:</label>
                            <input type="email" placeholder='user123@gmail.com' name='email' value={formData.email} onChange={handleChange} />

                            <label htmlFor="Password">Password:</label>
                            <input type="password" name='password' value={formData.password} onChange={handleChange} />
                            <button className="register-btn" disabled={isLoading} type="submit" >{isLoading ? ('Sigining In......'): ('Sign In')} <i className="fa fa-user"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    </div>
  )
}

export default Login
