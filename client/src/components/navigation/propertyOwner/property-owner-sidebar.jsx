import React, { useState } from "react";
import styles from '../sidebar.module.css';
import { Outlet, Link } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";


const PropertyOwnerSidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };


    return (
        <div className={styles.app}>
            <div className={styles.navbar}>
                <div><h2>LOGO</h2></div>
                <div style={{display: "flex"}}>
                    UserName
                    <button onClick={toggleSidebar} className={styles.toggle_button}>
                        {isOpen ? <FaWindowClose size={20} /> : <FaBars size={20}/>}
                    </button>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                    <ul>
                    
                        <li><Link onClick={toggleSidebar} to="/property-owner">Dashboard</Link></li>
                        <li><Link onClick={toggleSidebar} to="/property-owner/">View Request</Link></li>
                        <li><Link onClick={toggleSidebar} to="/property-owner/add-property">Add Property</Link></li>
                        <li><Link onClick={toggleSidebar} to="/property-owner/view-properties">View Properties</Link></li>
                        <li><Link onClick={toggleSidebar} to="/property-owner/">Verification Request</Link></li>
                    </ul>
                </div>

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>

        </div>  
    )

}

export default PropertyOwnerSidebar