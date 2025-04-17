import React from 'react';
import './filters.css';

const PropertyFilter = ({toggleFilter}) => {
  return (
    <div className="filter-listings">
      <div className='filter-container'>
      <div className="filter-tiltle">Filter Properties <span onClick={toggleFilter}><i className="fa fa-times"></i></span></div>
      <form action="">
        <div className="filters">
          <div className="filter-location">
            <h3>Location <i className="fa fa-map-marker"></i></h3>
            <input type="text" placeholder='Bambili Corners' />
          </div>
          <div className="property-type">
            <h3>Property Type</h3>
            <span>Building</span>
            <span>House</span>
            <span>Apartment</span>
            <span>Guest House</span>
            <span>Studio</span>
            <span>Single Room</span>
          </div>
          <div className="price-range">
            <h3>Price Range</h3>
            <div className="price-range-labels">
              <span>$0</span>
              <span>$10,000+</span>
            </div>
            <input type="range" min="0" max="10000" step="100" />
          </div>
          <div className="rooms-and-bath">
            <h3>Rooms and Bathrooms</h3>
            <div className="rooms">
              <label htmlFor="rooms">Rooms</label>
              <div className="addsub-rooms">
                <button>-</button><span>Any</span><button>+</button>
              </div>
            </div>
            <div className="rooms">
              <label htmlFor="rooms">Bathrooms</label>
              <div className="addsub-rooms">
                <button>-</button><span>Any</span><button>+</button>
              </div>
            </div>
          </div>
          <div className="Special-includes">
            <h3>Special Includes</h3>
            <div className='specials'><span>Water Tanks/Forage</span>  <input type="checkbox" /></div>
            <div className='specials'><span>Back-up Electricity Gen</span>  <input type="checkbox" /></div>
            <div className='specials'><span>Fenced</span>  <input type="checkbox" /></div>
            <div className='specials'><span>Security Guards</span> <input type="checkbox" /></div>
            <div className='specials'><span>Nearby Hospital</span>  <input type="checkbox" /></div>
            <div className='specials'><span>Nearby Gym</span>  <input type="checkbox" /></div>
          </div>
        </div>
        <div className="filter-actions">
          <input type="submit" value='Apply Filters'/>
        </div>
      </form>
    </div>
    </div>
  )
}

export default PropertyFilter;