import React from "react";
import styles from '../sidebar.module.css';
import { Outlet } from "react-router-dom";

const ServiceProviderSidebar = () => {
    return (
        <div className={styles.app}>
            <div className={styles.navbar}>
                <div><h2>LOGO</h2></div>
                <div>UserName</div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.sidebar}>
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