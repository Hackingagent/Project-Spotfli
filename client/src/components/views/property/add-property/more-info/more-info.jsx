import React from "react";
import styles from './more-info.module.css';


const MoreInfo = () => {


    return (
        <>
            <div className={styles.container}>
                <form className={styles.form}>
                    <label className={styles.input}>
                        Number of Living Rooms
                        <input type="number" name="livingRoom"/>
                    </label>

                    <label className={styles.input}>
                        Number of Rooms
                        <input type="number" name="room"/>
                    </label>

                    <label className={styles.input}>
                        Number of Toilet
                        <input type="number" name="toilet"/>
                    </label>

                    <label className={styles.input}>
                        Number of Kitchens
                        <input type="number" name="kitchen"/>
                    </label>


                </form>
            </div>
        </>
        
    );
}

export default MoreInfo