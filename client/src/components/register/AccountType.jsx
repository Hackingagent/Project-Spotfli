import React from 'react'
import './accountType.css'
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import Navbar from '../navbar/VisitorNav';
const AccountType = () => {
  return (
    <>
    <Navbar />
      <div className='account-type-container'>
      <div className="account-type">
      <div className="account-type-image">
        <img src={profile} alt="" />
      </div>
      <h1>Register As:</h1>
      <div className="register-options">
          <div className="option property-seeker">
            <Link className='acc-route' to="/registerPS">
            <i className="fa-solid fa-magnifying-glass"></i>      
            <span>Property Seeker</span>  
            </Link> 
          </div>

          <div className="option property-owner">
            <Link className='acc-route'  to="/registerPO">
            <i className="fa-solid fa-key"></i>
            <span>Property Owner</span>
            </Link>
          </div>
          <div className="option service-provider">
            <Link className='acc-route' to="/registerSP">
            <i className="fa-solid fa-tools"></i>
            <span>Service Provider</span>
            </Link>
          </div>
      </div>
      </div>
    </div>
    </>

  )
}

export default AccountType
