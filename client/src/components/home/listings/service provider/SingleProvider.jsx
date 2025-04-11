import React from 'react';
import provider from '../../../../assets/service images/service6.jpg';
import { Link } from 'react-router-dom';
import './serviceprovider.css';

const SingleProvider = () => {
  return (
    <div className='container'>
        <div className="service-provider-details fade-up">
            <div className="service-provider-sec1">
                <img src={provider}/>
                <h2>Kutuh Joseph <i className="fa fa-check verified"></i></h2>
                <div className="book-provider">
                    <Link className='links btn btn-primary'>Book Now <i class="fas fa-calendar-check"></i></Link>
                    <Link className='links btn btn-primary'>Write Review <i class="fas fa-comments"></i></Link>
                </div>
            </div>
            <div className="service-provider-sec2">
                <h1 className='category'>ELECTRICIAN <i className="fa fa-bolt"></i></h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita ut facilis excepturi vel vitae? Incidunt, explicabo! Tempora doloribus inventore omnis, fugit tempore ipsa minus facilis velit autem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem fugiat doloremque!
                </p>
                <div className="active-status">
                    <h3>Open Hours <i class="fas fa-business-time"></i></h3>
                    <span>Monday - Sunday (8am - 5pm)</span>
                </div>
                <div className="experience-level">
                    <h3>Experience Level <i class="fas fa-sliders-h"></i></h3>
                    <span>Expert </span>
                </div>
                <div className="experience-reviews">
                    <h3>Client Reviews</h3>
                    <div className="servicep-rating">
                        <span>4.3 <i className="fa fa-star"></i></span>
                        <span>45 Reviews</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleProvider