import React from "react";
import styles from './admin-dashboard.module.css';


const AdminDashboard = () =>{
    return (
        <div className={styles.dashboard}>

          <div className={styles.top}>
            <div className={styles.chart}> {/* Placeholder for chart */} 
              <p>Chart goes here</p>
            </div>
            <div className={styles.chartInfo}>
              <h2>New <br></br>Records</h2>
              <p>This chat shows the new real Estate Users added to website last 6 months</p>
              <a>View Long Term chart</a>
            </div>
            <div className={styles.registeredUsers}>
              <h3>All Registered Users on Website</h3>

              <h2>12.5k</h2>

              <p>Unverified Users <span>6.2k</span></p>
            </div>
          </div>


          <div className={styles.stats}>
            <div className={styles.statItem}>Property Owners <p>1,2047</p></div>
            <div className={styles.statItem}>Property Seekers <p>17,943</p></div>
            <div className={styles.statItem}>Pending Units <p>34,323</p></div>
            <div className={styles.statItem}>Message Sent(month) <p>34,321</p></div>
            <div className={styles.statItem}>Verified Units <p>2,490</p></div>
            <div className={styles.statItem}>Unverified Users <p>34,123</p></div>
          </div>


        </div>
    );
}

export default AdminDashboard