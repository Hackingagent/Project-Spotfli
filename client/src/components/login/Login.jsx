import React from 'react'
import login from '../../assets/register.jpg'
import '../register/propertySeeker/register.css';
import Navbar from '../navbar/VisitorNav';
import { Link } from 'react-router-dom';
const Login = () => {
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
                        <form>
                            <label htmlFor="emial">Email:</label>
                            <input type="email" placeholder='user123@gmail.com' />

                            <label htmlFor="Password">Password:</label>
                            <input type="password" />
                            <Link className="register-btn" to="/">Sign In <i className="fa fa-user"></i></Link>
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
