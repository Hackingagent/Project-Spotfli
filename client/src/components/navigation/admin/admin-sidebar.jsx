import React from "react";
import { Outlet } from "react-router-dom";
import styles from '../sidebar.module.css';
const AdminSidebar = () => {
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
                        <li>All Unit</li>
                        <li>Pending Units</li>
                        <li>Rejected Units</li>
                        <li>Reported Units</li>
                    </ul>
                </div>

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>

        </div>  
    )

}

export default AdminSidebar