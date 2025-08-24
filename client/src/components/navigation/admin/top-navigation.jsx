import React, { useState } from "react";
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';


const TopNavigation = ({heading}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const admin = JSON.parse(localStorage.getItem('admin'));
    
    return (
        <>
                  {/* Top Navigation */}
            <div className="top-nav">
                <h1>{heading}</h1>

                <div className="search-and-profile">
                <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="notification-button">
                    <FiBell />
                    <span className="notification-badge">3</span>
                </button>

                <div className="profile">
                    <div className="profile-icon">
                    <FiUser />
                    </div>
                    <span>{admin?.first_name} {admin?.second_name}</span>
                </div>
                </div>
            </div>
        </>
    )
}

export default TopNavigation