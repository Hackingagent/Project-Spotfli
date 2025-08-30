import React, { useState, useEffect } from 'react';
import styles from './RoomBookingsModal.module.css';
import { getPropertyRoomBookings } from '../../../../api/user/property/property';

const RoomBookingsModal = ({ room, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch bookings for this room
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Replace with your actual API call
        // const response = await getRoomBookings(room._id);
        // setBookings(response.bookings);
        
        // Mock data for demonstration

        const response = await getPropertyRoomBookings(room._id);
        console.log('Bookings response:', response);
        if(response.success){
          setBookings(response.bookings);
        } 
        
        // const mockBookings = [
        //   {
        //     _id: '1',
        //     guestName: 'John Doe',
        //     checkInDate: '2023-10-15',
        //     checkOutDate: '2023-10-20',
        //     status: 'confirmed', // confirmed, checked-in, checked-out, cancelled
        //     numberOfGuests: 2,
        //     specialRequests: 'Need early check-in if possible',
        //     contactInfo: 'john.doe@example.com'
        //   },
        //   {
        //     _id: '2',
        //     guestName: 'Jane Smith',
        //     checkInDate: '2023-10-18',
        //     checkOutDate: '2023-10-22',
        //     status: 'checked-in',
        //     numberOfGuests: 1,
        //     specialRequests: '',
        //     contactInfo: 'jane.smith@example.com'
        //   },
        //   {
        //     _id: '3',
        //     guestName: 'Robert Johnson',
        //     checkInDate: '2023-10-25',
        //     checkOutDate: '2023-10-28',
        //     status: 'confirmed',
        //     numberOfGuests: 3,
        //     specialRequests: 'Extra towels needed',
        //     contactInfo: 'robert.j@example.com'
        //   }
        // ];
        // setBookings(mockBookings);
      
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (room) {
      fetchBookings();
    }
  }, [room]);

  const handleCheckIn = async (bookingId) => {
    try {
      // Replace with your actual API call
      // await checkInBooking(bookingId);
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'checked-in' } 
            : booking
        )
      );
      setMessage('Guest checked in successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      // Replace with your actual API call
      // await checkOutBooking(bookingId);
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'checked-out' } 
            : booking
        )
      );
      setMessage('Guest checked out successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return styles.statusConfirmed;
      case 'checked-in':
        return styles.statusCheckedIn;
      case 'checked-out':
        return styles.statusCheckedOut;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.loading}>Loading bookings...</div>
      </div>
    </div>
  );
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Bookings for {room.roomType}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.modalContent}>
          {error && (
            <div className={styles.error}>{error}</div>
          )}
          
          {message && (
            <div className={styles.success}>{message}</div>
          )}
          
          <div className={styles.bookingsList}>
            {bookings.length === 0 ? (
              <p className={styles.noBookings}>No bookings found for this room.</p>
            ) : (
              bookings.map(booking => (
                <div key={booking._id} className={styles.bookingCard}>
                  <div className={styles.bookingHeader}>
                    <div>
                      <h3>{booking.user.first_name} {booking.user.last_name}</h3>
                      <p className={styles.contactInfo}>{booking.user.tell}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className={styles.bookingDetails}>
                    <div className={styles.detailRow}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Check-in:</span>
                        <span className={styles.detailValue}>{formatDate(booking.checkInDate)}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Check-out:</span>
                        <span className={styles.detailValue}>{formatDate(booking.checkOutDate)}</span>
                      </div>
                    </div>
                    
                    <div className={styles.detailRow}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>People:</span>
                        <span className={styles.detailValue}>{booking.number}</span>
                      </div>
                    </div>
                    
                    {booking.specialRequests && (
                      <div className={styles.detailRow}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Special Requests:</span>
                          <span className={styles.detailValue}>{booking.specialRequests}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.bookingActions}>
                    {booking.status === 'confirmed' && (
                      <button 
                        className={styles.checkInButton}
                        onClick={() => handleCheckIn(booking._id)}
                      >
                        Check In
                      </button>
                    )}
                    
                    {booking.status === 'checked-in' && (
                      <button 
                        className={styles.checkOutButton}
                        onClick={() => handleCheckOut(booking._id)}
                      >
                        Check Out
                      </button>
                    )}
                    
                    {booking.status === 'checked-out' && (
                      <span className={styles.completedText}>Completed</span>
                    )}
                    
                    {booking.status === 'cancelled' && (
                      <span className={styles.cancelledText}>Cancelled</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingsModal;