import React from "react";
import styles from './header-stats.module.css';

const HeaderStats = ({heading, subheading}) => {
    return (
        
            <div className={styles.container} >
                <div>
                    <h1>
                        {heading}
                    </h1>

                    <h3>
                        {subheading}
                    </h3>
                </div>
            </div>
        
    )
}

export default HeaderStats