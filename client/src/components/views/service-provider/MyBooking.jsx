import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings, updateBookingStatus } from '../../../api/user/serviceProvider/my-booking';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const { success, data, error } = await getMyBookings();
        
        if (success) {
          setBookings(data);
        } else {
          setError(error);
        }
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const { success, data, error } = await updateBookingStatus(bookingId, newStatus);
      if (success) {
        setBookings(prev => 
          prev.map(booking => 
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      } else {
        setError(error);
      }
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  if (loading) {
    return <div className="loading-spinner">Loading bookings...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <div className="booking-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
        </div>
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          No bookings found. <Link to="/services">Book a service now</Link>
        </div>
      ) : (
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.service?.name || 'N/A'}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.timeSlot}</td>
                  <td>
                    <select 
                      value={booking.status} 
                      onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                      className={`status-select ${booking.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <Link 
                      to={`/bookings/${booking._id}`} 
                      className="btn-view"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooking;