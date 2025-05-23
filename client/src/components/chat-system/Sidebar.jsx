// src/components/Sidebar.js
import React, { useState } from 'react';
import { TfiMoreAlt } from "react-icons/tfi";
import { FaEdit, FaTimes, FaVolumeUp, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { IoMdSearch, IoMdSettings, IoIosArchive, IoIosHelpCircle } from "react-icons/io";
import { LuMessageSquareOff } from "react-icons/lu";
import { MdOutlineReport, MdPayment, MdOutlineBlock } from "react-icons/md";
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

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleDrop = () => {
        setIsOpen(!isOpen);
        
    } 
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsOpen(!isOpen);
    }

    return (
        <div className="sidebar">

            <header className="sidebar-header">
                <div className="top">
                    <h2>Chats</h2>

                    <div className="top-icons">
                        <button className="dropButton" onClick={toggleDrop}>
                            <TfiMoreAlt size={20} style={{margin: "10px"}} />
                        </button>


                        {isOpen && (
                            <div className="dropdown">
                                <ul className="menu">
                                    <li onClick={toggleModal}><a href="#"> <IoMdSettings /><span>Preference</span></a></li>
                                    <li><a href="#"><IoIosArchive /> <span>Archive chats </span></a></li>
                                    <li><a href="#"> <LuMessageSquareOff /> <span>Restricted accounts </span></a></li>
                                    <li><a href="#"> <MdOutlineReport /><span> Reported chats </span></a></li>
                                    <li><a href="#"> <IoIosHelpCircle /><span>Help</span></a></li>
                                </ul>
                            </div>
                        )}   
                        <FaEdit size={20}  style={{margin: "10px"}}/>
                    </div>     
           
                </div>


                {isModalOpen && (
                    <div className="modal">
                        <header>
                            <h2>Preferences</h2>
                            <button onClick={toggleModal}><FaTimes /></button>
                        </header>

                        <div className='account'>
                            <h3>Account</h3>
                            <div className='details'>
                                <img src={profile} />
                                <div>
                                    <p>Jimmy Paul</p>
                                    <span>See your profile</span>
                                </div>

                            </div>
                        </div>

                        <div className='active'>
                            <img src={setup}/>
                            <p>Active Status: <span>ON</span></p>
                        </div>

                        <div className='notification'>
                            <h2>Notifications</h2>
                            <div className='not'>
                                <FaVolumeUp />
                                <div>
                                    <span>Notification sounds</span>
                                    <p>Use sounds to notify you about incoming messages, calls, video chats, and in-app sounds</p>
                                </div>
                                <FaToggleOn size={30} color='blue'/>
                                

                            </div>
                            <div className='not'>
                                <FaVolumeUp />

                                <div>
                                    <span>Do not Disturb</span>
                                    <p>Mute notification for specific period of time</p>
                                </div>

                                <FaToggleOff size={30} color='blue'/>


                            </div>
                        </div>

                        <div className='others'>
                            <h3> <MdPayment /> Manage Payment</h3>
                            <h3> <MdOutlineBlock />Manage blocking</h3>
                        </div>
                    </div>
                )}   

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