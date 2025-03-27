// src/components/Sidebar.js
import React from 'react';
import { TfiMoreAlt } from "react-icons/tfi";
import { FaEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import setup from '../../assets/setup.jpg';
import setup2 from '../../assets/setup2.jpg';
import profile from '../../assets/profile.jpg';


const users = [
    { id: 1, profile: setup, name: 'Jimmy Paul', lastSeen: 'Yesterday', lastMessage: 'Message content...', role: 'Electrician' },
    { id: 2, profile: setup2, name: 'Smith Paul', lastSeen: '1 hour ago', lastMessage: 'Message content...', role: 'Plumber' },
    { id: 3, profile: profile, name: 'John Bright', lastSeen: 'friday', lastMessage: 'Message content...', role: 'Plumber' },
    // Add more users as needed
];

const Sidebar = ({ onSelectUser }) => {
    return (
        <div className="sidebar">

            <header className="sidebar-header">
                <div className="top">
                    <h2>Chats</h2>

                    <div className="top-icons">
                        <TfiMoreAlt size={20} style={{margin: "10px"}} />
                        <FaEdit size={20}  style={{margin: "10px"}}/>
                    </div>                   
                </div>

                <div className="bottom" >
                    <IoMdSearch style={{ position: 'absolute', marginTop: "15px",  transform: 'translateY(-50%)', left: '3%'}} />
                    <input type="text" Placeholder="Search"  />
                    
                </div>

            </header>

            <br />
            {users.map(user => (
                <div key={user.id} className="user" onClick={() => onSelectUser(user)}>
                    <div className="user-info">
                        <img src={user.profile}/>

                        <div className="info">

                            <div className="info-top">
                                <h4>{user.name}</h4>
                                <span>{user.lastSeen}</span>
                            </div>

                            <p>{user.lastMessage}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;