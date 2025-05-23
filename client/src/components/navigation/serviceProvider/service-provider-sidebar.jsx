import React, { useState } from "react";
import styles from '../sidebar.module.css';
import { Outlet } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";

const ServiceProviderSidebar = () => {

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
                        <li>DashBoard</li>
                        <li>Client</li>
                        <li>View Bookings</li>
                        <li>Add Services</li>
                        <li>View Services</li>
                    </ul>
                </div>

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>

        </div>  
    )

}

export default ServiceProviderSidebar