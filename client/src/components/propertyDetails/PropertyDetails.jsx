import React from 'react'
import LogedinNav from '../navbar/LoggedinNav';
// import OptionBar from '../home/optionBar/OptionBar';
import house3 from '../../assets/properties/house3.jpg';
import house4 from '../../assets/properties/house4.jpg';
import house5 from '../../assets/properties/house5.jpg';
import house6 from '../../assets/properties/house6.jpg';
import house7 from '../../assets/properties/house7.jpg';
import './propertyDetails.css'
const PropertyDetails = () => {
  return (
    <>
    <LogedinNav />
    {/* <OptionBar /> */}
    <div className="property-details-container">
        <div className="property-details fade-up">
        <div className="property-images">
            <div className="rooms-display">
                <img src={house7} alt="" />
                <img src={house4} alt="" />
                <img src={house5} alt="" />
                <img src={house7} alt="" />
            </div>
            <div className="building-display">
                <img src={house5} alt="" />
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default PropertyDetails
