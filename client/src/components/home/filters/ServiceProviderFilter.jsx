import React from 'react';
import './filters.css';

const ServiceProviderFilter = ({ toggleFilter }) => {

  return (
    <div className="filter-listings">
            <div className='filter-container'>
      <div className="filter-tiltle">
        Filter Service Providers 
        <span onClick={toggleFilter}><i className="fa fa-times"></i></span>
      </div>
      <form action="">
        <div className="filters">
          <div className="filter-location">
            <h3>Location <i className="fa fa-map-marker"></i></h3>
            <input type="text" placeholder='Enter your location' />
          </div>
          
          <div className="property-type">
            <h3>Service Category</h3>
            <span>Electrician</span>
            <span>Plumber</span>
            <span>Barber</span>
            <span>Hair Stylist</span>
            <span>Mechanic</span>
            <span>Food Delivery</span>
            <span>Cleaning</span>
            <span>Tutor</span>
            <span>Personal Trainer</span>
          </div>
          
          <div className="price-range">
            <h3>Hourly Rate Range</h3>
            <div className="price-range-labels">
              <span>$5/hr</span>
              <span>$100+/hr</span>
            </div>
            <input type="range" min="5" max="100" step="5" />
          </div>
          
          <div className="availability">
            <h3>Availability</h3>
            <div className='specials'>
              <span>Available Now</span>
              <input type="checkbox" />
            </div>
            <div className='specials'>
              <span>Weekdays</span>
              <input type="checkbox" />
            </div>
            <div className='specials'>
              <span>Weekends</span>
              <input type="checkbox" />
            </div>
            <div className='specials'>
              <span>Emergency Service</span>
              <input type="checkbox" />
            </div>
          </div>
          
          <div className="rating">
            <h3>Minimum Rating</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="star">★</span>
              ))}
            </div>
          </div>
          
          <div className="Special-includes">
            <h3>Additional Filters</h3>
            <div className='specials'>
              <span>Verified Providers</span>
              <input type="checkbox" />
            </div>
            <div className='specials'>
              <span>Background Checked</span>
              <input type="checkbox" />
            </div>
            <div className='specials'>
              <span>Accepts Online Payment</span>
              <input type="checkbox" />
            </div>
            <div className='specials'>
              <span>Provides Invoice</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        
        <div className="filter-actions">
          <input type="submit" value='Find Providers'/>
        </div>
      </form>
    </div>
    </div>

  )
}

export default ServiceProviderFilter;