import React, { useState } from 'react'
import ServiceProviderAppication from './ServiceProviderAppication';
import './UpdateAccount.css'


const UpdateAccount = () => {
    const [UpdatePanel, isUpdatePanel] = useState(false);
    const toggleUpdatePanel = () =>{
        isUpdatePanel(!UpdatePanel);
    }
  return (
    <div className='container Update-account-container'>
    {UpdatePanel && <ServiceProviderAppication toggleUpdatePanel={toggleUpdatePanel} />}
    <div className='update-account-options'>
    {/* option 1 */}
    <div className='account-option' >
        <h2>Become a property owner <i className='fa fa-building'></i></h2>    
        <p>
            update your account here to become a property owner or house agent in order to rent out or sell properties
        </p>    
    </div>
    {/* option 2 */}
    <div className='account-option' onClick={toggleUpdatePanel}>
        <h2>Become a service provider <i className='fa fa-gear'></i></h2>
        <p>
            update you account here to register yourself or buisness and provide services to other users
        </p>
    </div>
    </div>
    </div>
  )
}

export default UpdateAccount