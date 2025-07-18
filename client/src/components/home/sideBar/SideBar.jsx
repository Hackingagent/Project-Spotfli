import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../../../assets/logo2.png';
import './sideBar.css';

const SideBar = ({ isOpen, toggleSidebar }) => { // Receive isOpen and toggleSidebar as props
  const [isServiceProvider, setServiceProvider] = useState(true);
  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className="side-bar">
        <div className="side-bar-top">
          <img src={logoLight} alt="" />
          <i className="fa fa-times" onClick={toggleSidebar}></i> {/* Use the toggle function */}
        </div>
        <ul className="sidebar-content">
          {isServiceProvider && <>
          <li>
            <Link className="sideLinks" to="/">
              My Service <i className="fa fa-dashboard"></i>{' '}
            </Link>
          </li>
          </>}
          <li>
            <Link className="sideLinks" to="/accountbilling">
              Manage Account <i className="fa fa-user"></i>{' '}
            </Link>
          </li>
          <li>
            <Link className="sideLinks" to="/coliving">
              Find Room-Mate <i className="fa fa-bed"></i>{' '}
            </Link>
          </li>
          <li>
            <Link className="sideLinks" to="/vacationPlan">
              Vacation Plan <i className="fa fa-hotel"></i>{' '}
            </Link>
          </li>
          <li>
            <Link className="sideLinks" to="/">
              Assistant <i className="fa fa-robot"></i>{' '}
            </Link>
          </li>
          <li>
            <Link className="sideLinks" to="/">
              My Friends <i className="fa fa-users"></i>{' '}
            </Link>
          </li>
          <li>
            <Link className="sideLinks" to="/">
              Land Purchase <i className="fa fa-dollar"></i>{' '}
            </Link>
          </li>
          <li>
            <Link className="sideLinks" to="/">
              Settings <i className="fa fa-gear"></i>{' '}
            </Link>
          </li>
          <li>

          </li>
        </ul>
        <div className="side-bar-buttons">
        <Link className="sideLinks notification" to="/">
              Notification <i className="fa fa-bell"></i>{' '}
        </Link>
        <Link className="sideLinks logout" to="/">
              Logout <i className="fa fa-sign-out"></i>{' '}
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;