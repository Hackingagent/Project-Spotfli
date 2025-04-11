import React from 'react'
import LogedinNav from '../navbar/LoggedinNav';
// import OptionBar from '../home/optionBar/OptionBar';
import house3 from '../../assets/properties/house3.jpg';
import house4 from '../../assets/properties/house4.jpg';
import house5 from '../../assets/properties/house5.jpg';
import house6 from '../../assets/properties/house6.jpg';
import house7 from '../../assets/properties/house7.jpg';
import profile from '../../assets/profile.jpg';
import './propertyDetails.css'
import { Link } from 'react-router-dom';
const PropertyDetails = () => {
  return (
    <>
    <div className="property-details-container">
        <div className="property-details fade-up">
        <div className="property-images">
            <div className="rooms-display">
                <img src={house7} alt="" />
                <img src={house7} alt="" />
                <img src={house7} alt="" />
                <img src={house7} alt="" />
            </div>
            <div className="building-display">
                <img src={house5} alt="" />
                <div className=""></div>
            </div>
        </div>
        </div>

        <div className="property-description">
          <div className="primary-description fade-up">
            <div className="description-1">
              <div className="author">
                <img src={profile} alt="" />
                <span>Foncho Regina spears  <i className="fa fa-check verified"></i></span>
              </div>
              <h2 className='property-name'>Mansfeild Plaza Hostel <i className="fa fa-house"></i></h2>
              <span className='propery-type'>4 Bed Room Apartments</span>
              <div className='property-specials'>
                <span>Special About This Property</span>
                <span><i className="fa fa-arrow-right"></i> Constant Water Supply</span>
                <span><i className="fa fa-arrow-right"></i> Back up electricity generator</span>
                <span><i className="fa fa-arrow-right"></i> Fenced</span>
                <span><i className="fa fa-arrow-right"></i> Security guard</span>
                <span><i className="fa fa-arrow-right"></i> Cleaners</span>
                <span><i className="fa fa-arrow-right"></i> Large parking/cerimonial space</span>
                <span><i className="fa fa-arrow-right"></i> Close to a hospital</span>
              </div>
              
            </div>

            <div className="description-2">
              <div className="availability">
                <h3>Availability:</h3>
                <span>3 Apartments Available</span>
              </div>
              <div className="location">
                <h3>Location <i className="fa fa-map-marker"></i></h3>
                <span>North West, Bamenda, Bambili, Down Quaters</span>
              </div>
              <div className='rating'>
                <h3>Rating <i className="fa fa-star"></i></h3>
                <span>4.5 <i className="fa fa-star"></i> From 29 tenants</span>
              </div>

              <div className='likes'>
                <h3>Likes <i className="fa fa-thumbs-up"></i></h3>
                <span>45 <i className="fa fa-heart"></i></span>
              </div>

              <div className="actions">
                <Link className='links' to='/'><button className='btn btn-primary'>See Reviews</button></Link>
                <Link className='links' to='/'><button className='btn btn-primary'>Report Property</button></Link>
              </div>
            </div>

            <div className="description-3 booking">
              <button className='btn btn-primary'>Book Now for FREE</button>
            </div>


            
          </div>
        </div>
    </div>
    </>
  )
}

export default PropertyDetails
