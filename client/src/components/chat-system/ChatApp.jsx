// src/components/ChatApp.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './ChatApp.css'; // You can add CSS for styling

const ChatApp = () => {
    const [selectedUser, setSelectedUser] = useState(null);



    return (
        <div className="chat-app">
            <Sidebar  onSelectUser={setSelectedUser} />
            <ChatWindow user={selectedUser} />
        </div>
    );
};

export default ChatApp;