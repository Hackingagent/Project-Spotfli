import React from 'react'
import './accountbilling.css'
import { Link } from 'react-router-dom'
const AccountBilling = () => {
  return (
    <div className='container account-billing-container'>
        <h2>Account & Billings</h2>
        <div>
            <span>John Duo, user123@gmail.com <Link to=''>Go to profile</Link></span>
        </div>
        <div className="fade-up account-billing-options">
            <div className="ab-option">
                <i className="fa fa-user"></i>
                <h2>Personal Info</h2>
                <p>Provide personal details and how we can reach you</p>
            </div>
            <div className="ab-option">
                <i className="fa fa-shield"></i>
                <h2>Login & Security</h2>
                <p>Update your password, Add verification emails and/or phone numbers, and secure your account</p>
            </div>
            <div className="ab-option">
                <i className="fa fa-wallet"></i>
                <h2>Payments & Payouts</h2>
                <p>Add payment methods, review payments, payouts and coupons</p>
            </div>
            <div className="ab-option">
                <i className="fa fa-bell"></i>
                <h2>Notifications</h2>
                <p>Choose and manage your notification preferences like push notifications and permitions </p>
            </div>
            <div className="ab-option">
                <i className="fa fa-lock"></i>
                <h2>Privacy & Sharing</h2>
                <p>Manage your personal data, connected devices and data sharing services</p>
            </div>
            <div className="ab-option">
                <i className="fas fa-sliders-h"></i>
                <h2>Global Preferences Info</h2>
                <p>Set your default language, currency, theme, and timezone</p>
            </div>
            {/* Update Account Type */}
            <Link className='links' to='/update-account'>
            <div className="ab-option">
                <i className="fas fa-sync"></i>
                <h2>Update Account Type</h2>
                <p>You can update your account in order to Sell services or rent out properties</p>
            </div>
            </Link>


        </div>
    </div>
  )
}

export default AccountBilling
