import { NavLink } from 'react-router-dom';
import './HotelSidebar.css';

const HotelSidebar = ({ isOpen, toggle }) => {
  const navItems = [
    { path: '/hotel', icon: 'fa-home', label: 'Overview' },
    { path: '/hotel/rooms', icon: 'fa-bed', label: 'Manage Rooms' },
    { path: '/hotel/bookings', icon: 'fa-calendar', label: 'Bookings' },
    { path: '/hotel/analytics', icon: 'fa-chart-line', label: 'Analytics' },
    { path: '/hotel/settings', icon: 'fa-cog', label: 'Settings' },
    { path: '/hotel/finace', icon: 'fa-money', label: 'Manage Finance'}
  ];

  return (
    <aside className={`hoteldash-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="hoteldash-sidebar-header">
        <h3>Hotel Dashboard</h3>
        <button onClick={toggle} className="hoteldash-sidebar-toggle">
          <i className={`fa fa-${isOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>
      <nav className="hoteldash-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `hoteldash-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <i className={`fa ${item.icon}`}></i>
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default HotelSidebar;