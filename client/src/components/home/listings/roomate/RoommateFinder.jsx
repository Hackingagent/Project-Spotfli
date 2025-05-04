import React, { useState } from 'react';
import { FaSearch, FaUserFriends, FaMapMarkerAlt, FaMoneyBillWave, FaBed, FaFilter, FaPlus } from 'react-icons/fa';
import mate from '../../../../assets/service images/service3.jpg'
import mate2 from '../../../../assets/service images/service4.jpg'
import mate3 from '../../../../assets/service images/service5.jpg'

import './roommate-finder.css';

const RoommateFinder = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    budget: '',
    gender: '',
    moveInDate: ''
  });
  
  const [postDetails, setPostDetails] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    genderPreference: '',
    availableFrom: '',
    roomType: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching with filters:', searchFilters);
    // API call would go here
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log('Creating post:', postDetails);
    // API call would go here
  };

  // Mock data for roommate listings
  const roommateListings = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 28,
      gender: "Male",
      bio: "Software engineer looking for a quiet place near downtown. Non-smoker, clean, and respectful.",
      budget: "$800-$1000",
      location: "Downtown",
      moveInDate: "June 1, 2023",
      interests: ["Hiking", "Reading", "Cooking"],
      image: mate3
    },
    {
      id: 2,
      name: "Sarah Miller",
      age: 25,
      gender: "Female",
      bio: "Graduate student seeking female roommate for 2BR apartment near campus. Prefers non-smoking environment.",
      budget: "$600-$800",
      location: "University District",
      moveInDate: "May 15, 2023",
      interests: ["Yoga", "Painting", "Movies"],
      image: mate
    },
    {
      id: 3,
      name: "Jamie Taylor",
      age: 30,
      gender: "Non-binary",
      bio: "Professional looking for room in pet-friendly home. I have one small, well-behaved dog.",
      budget: "$900-$1100",
      location: "Westside",
      moveInDate: "Flexible",
      interests: ["Animals", "Gardening", "Photography"],
      image: mate2
    }
  ];

  return (
    <div className="roommate-finder-container">
      <div className="roommate-header">
        <h2><FaUserFriends /> Roommate Finder</h2>
        <p>Connect with potential roommates that match your lifestyle and preferences</p>
      </div>

      <div className="roommate-tabs">
        <button 
          className={`tab-btn ${activeTab === 'find' ? 'active' : ''}`}
          onClick={() => setActiveTab('find')}
        >
          Find Roommates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          Create a Post
        </button>
      </div>

      {activeTab === 'find' ? (
        <div className="find-roommate">
          <form className="search-filters" onSubmit={handleSearchSubmit}>
            <h3><FaFilter /> Filter Roommates</h3>
            <div className="filter-grid">
              <div className="filter-field">
                <label><FaMapMarkerAlt /> Location</label>
                <input
                  type="text"
                  name="location"
                  value={searchFilters.location}
                  onChange={handleFilterChange}
                  placeholder="City, neighborhood, or ZIP"
                />
              </div>
              
              <div className="filter-field">
                <label><FaMoneyBillWave /> Max Budget</label>
                <select
                  name="budget"
                  value={searchFilters.budget}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="500">$500</option>
                  <option value="750">$750</option>
                  <option value="1000">$1000</option>
                  <option value="1250">$1250</option>
                  <option value="1500">$1500</option>
                  <option value="2000">$2000+</option>
                </select>
              </div>
              
              <div className="filter-field">
                <label><FaUserFriends /> Gender</label>
                <select
                  name="gender"
                  value={searchFilters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="no-preference">No preference</option>
                </select>
              </div>
              
              <div className="filter-field">
                <label><FaBed /> Move-in Date</label>
                <input
                  type="text"
                  name="moveInDate"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  value={searchFilters.moveInDate}
                  onChange={handleFilterChange}
                  placeholder="When are you moving?"
                />
              </div>
            </div>
            
            <button type="submit" className="search-btn">
              <FaSearch /> Search
            </button>
          </form>

          <div className="roommate-listings">
            <h3>Available Roommates</h3>
            
            {roommateListings.map(roommate => (
              <div key={roommate.id} className="roommate-card">
                <div className="roommate-avatar">

                    <img className='avatar-placeholder' src={roommate.image} alt="" />

                </div>
                
                <div className="roommate-details">
                  <div className="roommate-header">
                    <h4>{roommate.name}, {roommate.age}</h4>
                    <span className="gender-badge">{roommate.gender}</span>
                  </div>
                  
                  <p className="bio">{roommate.bio}</p>
                  
                  <div className="roommate-meta">
                    <span><FaMapMarkerAlt /> {roommate.location}</span>
                    <span><FaMoneyBillWave /> {roommate.budget}</span>
                    <span><FaBed /> {roommate.moveInDate}</span>
                  </div>
                  
                  <div className="interests">
                    {roommate.interests.map((interest, i) => (
                      <span key={i} className="interest-tag">{interest}</span>
                    ))}
                  </div>
                </div>
                
                <button className="connect-btn">Connect</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="create-post">
          <form className="post-form" onSubmit={handlePostSubmit}>
            <h3><FaPlus /> Create Your Roommate Post</h3>
            
            <div className="form-group">
              <label>Post Title</label>
              <input
                type="text"
                name="title"
                value={postDetails.title}
                onChange={handlePostChange}
                placeholder="e.g., 'Looking for roommate in downtown apartment'"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={postDetails.description}
                onChange={handlePostChange}
                placeholder="Tell potential roommates about yourself and what you're looking for..."
                rows="5"
                required
              ></textarea>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label><FaMapMarkerAlt /> Location</label>
                <input
                  type="text"
                  name="location"
                  value={postDetails.location}
                  onChange={handlePostChange}
                  placeholder="Where is the room located?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label><FaMoneyBillWave /> Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  value={postDetails.budget}
                  onChange={handlePostChange}
                  placeholder="e.g., $800-$1000"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Room Type</label>
                <select
                  name="roomType"
                  value={postDetails.roomType}
                  onChange={handlePostChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="private">Private Room</option>
                  <option value="shared">Shared Room</option>
                  <option value="studio">Studio</option>
                  <option value="apartment">Entire Apartment</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Gender Preference</label>
                <select
                  name="genderPreference"
                  value={postDetails.genderPreference}
                  onChange={handlePostChange}
                >
                  <option value="">No preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Available From</label>
                <input
                  type="text"
                  name="availableFrom"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  value={postDetails.availableFrom}
                  onChange={handlePostChange}
                  placeholder="When is the room available?"
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="submit-post-btn">
              Post Listing
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RoommateFinder;