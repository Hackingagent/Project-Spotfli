import React from 'react';
import loader from '../../assets/preloadoers/Main Scene.gif'
import './Loader.css';
const Loader = () => (
  <div className="loader">
    <img src={loader} alt="Loading..." />
    <p>Loading...</p>
  </div>
);

export default Loader;