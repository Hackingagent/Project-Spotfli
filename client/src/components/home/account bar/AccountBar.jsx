import React from 'react';
import profile from '../../../assets/profile.jpg';
import { Link } from 'react-router-dom';
import './accountbar.css';

const AccountBar = ({isOpen, toggleAccountBar}) => {
  return (
    <div>
    <div onClick={toggleAccountBar} className={`account-bar-container ${isOpen ? 'open' : ''}`}>
        <div className="accountbar-picture">
            <img src={profile} alt="profile picture" />
            <span>John Duo</span>
        </div>
        <ul className="account-links">
            {/* <li><i className="fa fa-user"></i><Link className='links' to='/'> User Name</Link></li>  */}
            <li><Link className='links' to='/accountbilling'><i className="fa fa-gear"></i> Account & Billing</Link></li>
            <li><Link className='links' to='/help'><i class="fas fa-info-circle"></i> Help & Support</Link></li>
            <li><Link className='links' to='/'><i className="fa fa-sun"></i> Light Theme</Link></li>
            <li><Link className='links' to='/'>
                <div className="account-lang">
                    <span><i className="fa fa-globe"></i> Language</span>
                    <span>English <div className="i fa fa-chevron-down"></div></span>
                </div></Link></li>
            <li><Link className='links' to='/'><i className="fa fa-sign-out"></i > Log Out</Link></li>
        </ul>
    </div>
    </div>
  )
}

export default AccountBar
