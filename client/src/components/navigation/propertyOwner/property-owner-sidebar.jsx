import React from "react";
import styles from '../sidebar.module.css';
import { Outlet } from "react-router-dom";

const PropertyOwnerSidebar = () => {
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
                        <li>View Request</li>
                        <li>Add Property</li>
                        <li>View Properties</li>
                        <li>Verification Request</li>
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