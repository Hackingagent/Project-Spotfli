import React, { useState, useEffect } from 'react';

const Notification = ({ message, noMessage, type  }) => {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (message) {
            setShow(true);
            setProgress(100); // Reset progress whenever a new message is received

            const duration = 10000; // 10 seconds
            const timer = setTimeout(() => {
                setShow(false);
                noMessage();
            }, duration);

            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - (100 / (duration / 100)); // Update progress every 100ms
                });
            }, 100);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        } else {
            setShow(false); // Hide notification if there is no message
        }
    }, [message, noMessage]);

    if (!show) return null;

    const backgroundColor = type === 'success' ? 'rgb(100, 149, 237)' : ' rgb(133, 54, 54)'; // Example for error

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px', // Adjust as needed
                right: '20px', // Adjust as needed
                backgroundColor: backgroundColor,
                color: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                width: '250px', // Adjust width as needed
            }}
        >
            <p
                style={{
                    color: 'white',
                }}
            >{message}</p>
            <div
                style={{
                    height: '5px',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginTop: '8px',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        transition: 'width 0.1s linear',
                    }}
                />
            </div>
        </div>
    );
};

export default Notification;