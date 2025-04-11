import React from 'react';
import './visitorNav.css';
import logo from '../../assets/logo1.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='navbar-container'>
        <nav>
            <Link to='/'><img className='logo' src={logo} alt="" /></Link>
            <ul className='nav-links'>
                <li><Link className='link' to="/">Home <i className="fa fa-home"></i></Link></li>
                <li><Link className='link' to="/">Listings <i className="fa fa-building"></i></Link></li>
                <li><Link className='link' to="/">Service Provider <i className="fa fa-gear"></i></Link></li>
                <li><Link className='link' to="/">Login <i className="fa fa-user"></i></Link></li>
                <li className=''><Link className='btn' to="/"> <button className='btn btn-primary'>Register</button></Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
