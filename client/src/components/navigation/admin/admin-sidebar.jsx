import React from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiCheckCircle, 
  FiDollarSign, 
  FiPieChart, 
  FiAlertTriangle, 
  FiSettings,
  FiMenu
} from 'react-icons/fi';
import { FaTools } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = ({ open, mobileOpen, activeTab, onTabChange, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${open ? 'open' : 'closed'} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        {open ? (
          <h2>SPOTFLI</h2>
        ) : (
          <div className="sidebar-logo">SF</div>
        )}
      </div>

      <div className="sidebar-menu">
        <SidebarItem 
          icon={<FiHome />} 
          text="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => {
            onTabChange('dashboard')
            navigate('/admin', {replace: true})
          } 
          }
          open={open}
        />

        <SidebarItem 
          icon={<FiHome />} 
          text="Property Owners" 
          active={activeTab === 'property-owner'} 
          onClick={() => {
            onTabChange('property-owner')
            navigate('/admin', {replace: true})
          } 
          }
          open={open}
        />

        <SidebarItem 
          icon={<FiHome />} 
          text="Service Provider" 
          active={activeTab === 'service-provider'} 
          onClick={() => {
            onTabChange('service-provider')
            navigate('/admin', {replace: true})
          } 
          }
          open={open}
        />
        {/* <SidebarItem 
          icon={<FiUsers />} 
          text="User Management" 
          active={activeTab === 'users'} 
          onClick={() => onTabChange('users')} 
          open={open}
        />
        <SidebarItem 
          icon={<FiCheckCircle />} 
          text="Approvals" 
          active={activeTab === 'approvals'} 
          onClick={() => onTabChange('approvals')} 
          open={open}
        />
        <SidebarItem 
          icon={<FiDollarSign />} 
          text="Escrow Payments" 
          active={activeTab === 'payments'} 
          onClick={() => onTabChange('payments')} 
          open={open}
        />
        <SidebarItem 
          icon={<FiAlertTriangle />} 
          text="Disputes" 
          active={activeTab === 'disputes'} 
          onClick={() => onTabChange('disputes')} 
          open={open}
        /> */}
        <SidebarItem 
          icon={<FaTools />} 
          text="Services" 
          active={activeTab === 'services'} 
          onClick={() => {
              onTabChange('services')
              navigate('/admin/services', {replace: true})
            
            }
          } 
          open={open}
        />
        <SidebarItem 
          icon={<FiSettings />} 
          text="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => onTabChange('settings')} 
          open={open}
        />
      </div>

      <div className="sidebar-footer">
        <button 
          onClick={onToggle}
          className="collapse-button"
        >
          <FiMenu />
          {open && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick, open }) => {
  return (
    <div 
      onClick={onClick}
      className={`sidebar-item ${active ? 'active' : ''}`}
    >
      <div className="sidebar-icon">{icon}</div>
      {open && <span>{text}</span>}
    </div>
  );
};

export default AdminSidebar;