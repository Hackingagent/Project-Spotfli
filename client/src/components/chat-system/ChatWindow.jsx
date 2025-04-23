// src/components/ChatWindow.js
import React from 'react';
import icon from '../../assets/logo1.png';
import { FaPhone } from "react-icons/fa6";
import { IoMdVideocam } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaSmile, FaMicrophone, FaRegHeart,  } from "react-icons/fa";
import { MdPhotoSizeSelectActual } from "react-icons/md";

import { RiInformationFill } from "react-icons/ri";

const ChatWindow = ({ user }) => {
    if (!user) {
        return <div className="chat-window-empty">
            <img src={icon} />
        </div>;
    }

    return (
        <div className="chat-window">

            <header className='chat-window-header'>
                <div className="left">
                    <img src={user.profile}/>

                    <div className="user-info">
                      
                        <h4>{user.name}</h4>
                        <span>last seen {user.lastSeen}</span>
                       
                    </div>
                </div>
                <div className='right'>
                    <FaPhone className='icons' />
                    <IoMdVideocam  className='icons'/>
                    <RiInformationFill className='icons'/>

                </div>
                {/* <img src={user.profile} /> */}
            </header>

            <main className='chat-window-main'>
                <div className='message-top'>
                    <img src={user.profile} />
                    <h4>{user.name}</h4>
                    <span>{user.role}</span>
                    <button>View Profile</button>
                </div>


                <div className='chat-messages'>
                    <div className=' message sent'>
                        <p>Hello How are you doing today</p>
                        <span className='timestamp'>12:00 AM</span>
                    </div>
                    <div className='message received'>
                        <p>I'm doing great thanks and you?</p>
                        <span className='timestamp'>12:02 AM</span>
                    </div>
                    <div className=' message sent'>
                        <p>Hello How are you doing today</p>
                        <span className='timestamp'>12:00 AM</span>
                    </div>
                    <div className='message received'>
                        <p>I'm doing great thanks and you?</p>
                        <span className='timestamp'>12:02 AM</span>
                    </div>
                </div>
            </main>
            {/* Display messages here */}
            <footer className='chat-window-footer'>
                <FaSmile className='left-icon' />

               
                <input
                    type="text"
                    placeholder="Write a message..."
                />
                <div className='right-icons'>
                    <FaMicrophone className='input-icons' />
                    <MdPhotoSizeSelectActual className='input-icons'/>
                    <FaRegHeart className='input-icons' />
                </div>
                <button ><IoIosSend size={25}/></button>
            </footer>
            
        </div>
    );
};

export default ChatWindow;