import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      setTimeout(() => {
        setBookings([
          {
            id: 1,
            guestName: 'John Doe',
            roomType: 'Deluxe Room',
            checkIn: '2023-06-15',
            checkOut: '2023-06-20',
            status: 'checked-in',
            totalPrice: 1000
          },
          // More bookings...
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchBookings();
  }, []);

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const updateStatus = (id, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const extendStay = (id, newCheckoutDate) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, checkOut: newCheckoutDate } : booking
      )
    );
  };

  return (
    <div className="hoteldash-bookings">
      <div className="hoteldash-bookings-header">
        <h2>Manage Bookings</h2>
        <div className="hoteldash-bookings-filters">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('reserved')} 
            className={filter === 'reserved' ? 'active' : ''}
          >
            Reserved
          </button>
          <button 
            onClick={() => setFilter('checked-in')} 
            className={filter === 'checked-in' ? 'active' : ''}
          >
            Checked In
          </button>
          <button 
            onClick={() => setFilter('checked-out')} 
            className={filter === 'checked-out' ? 'active' : ''}
          >
            Checked Out
          </button>
          <button 
            onClick={() => setFilter('canceled')} 
            className={filter === 'canceled' ? 'active' : ''}
          >
            Canceled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="hoteldash-loading">Loading bookings...</div>
      ) : (
        <div className="hoteldash-bookings-table">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.guestName}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>
                    <span className={`hoteldash-status ${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>${booking.totalPrice}</td>
                  <td>
                    <Link 
                      to={`/hotel/bookings/${booking.id}`} 
                      className="hoteldash-btn-small"
                    >
                      View
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

export default ManageBookings;