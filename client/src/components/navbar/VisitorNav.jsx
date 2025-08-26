import React, { useState } from 'react';
import './visitorNav.css';
import logo from '../../assets/logo1.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [visitorNav, setVisitorNav] = useState(false);
  const toggleVisitorNav = () => {
    setVisitorNav(!visitorNav);
  }
  return (
    <div className='navbar-container'>
        <nav>
            <Link to='/'><img className='logo' src={logo} alt="" /></Link>
            <ul className='nav-links'>
                <li><Link className='link' to="/">Home <i className="fa fa-home"></i></Link></li>
                <li><Link className='link' to="/">Listings <i className="fa fa-building"></i></Link></li>
                <li><Link className='link' to="/">Service Provider <i className="fa fa-gear"></i></Link></li>
                <li><Link className='link' to="/admin/login">Admin Login <i className="fa fa-user"></i></Link></li>
                <li><Link className='link' to="/hotel/login">Hotel Login <i className="fa fa-user"></i></Link></li>
                {/* <li><Link className='link' to="/">Login <i className="fa fa-user"></i></Link></li> */}
                <li className=''><Link className='btn' to="/"> <button className='btn btn-primary'>Register</button></Link></li>
            </ul>
            <i onClick={toggleVisitorNav} className={`bars ${visitorNav ? 'fa fa-times' : 'fa fa-bars'}`}></i>
            {visitorNav && <>
              <ul className='fade-up mobile-nav-links'>
                <li><Link className='links' to="/">Home <i className="fa fa-home"></i></Link></li>
                <li><Link className='links' to="/">Listings <i className="fa fa-building"></i></Link></li>
                <li><Link className='links' to="/">Service Provider <i className="fa fa-gear"></i></Link></li>
                <li><Link className='links' to="/admin/login">Admin Login <i className="fa fa-user"></i></Link></li>
                <li><Link className='links' to="/hotel/login">Hotel Login <i className="fa fa-user"></i></Link></li>
                <li className=''><Link className='btn' to="/"> <button className='btn btn-primary'>Register</button></Link></li>
            </ul>
            </>}
        </nav>
    </div>
  )
}

export default Navbar
