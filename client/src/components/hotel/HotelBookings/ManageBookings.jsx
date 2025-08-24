import { useState, useEffect } from 'react';
import { getHotelBookings, updateBookingStatus, deleteHotelBooking } from '../../../api/hotel/hotelApi';
import { formatDate, formatCurrency } from '../../../utils/format';
import BookingStatusBadge from './BookingStatusBadge';
import BookingActions from './BookingActions';
import WalkInBookingModal from './WalkInBookingModal';
import BookingDetailsModal from './BookingDetailsModal';
import Loader from '../../common/Loader';
import './css/ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getHotelBookings(filter === 'all' ? '' : filter);
      if (response.success) {
        console.log('Fetched bookings:', response.data);
        setBookings(response.data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const handleStatusUpdate = async (roomId, bookingId, statusData) => {
    try {
      setLoading(true);
      console.log('Updating booking status:', { roomId, bookingId, statusData });
      
      const response = await updateBookingStatus(roomId, bookingId, statusData);
      if (response.success) {
        console.log('Booking status updated successfully');
        fetchBookings(); // Refresh bookings
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (roomId, bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }
    
    try {
      setLoading(true);
      console.log('Deleting booking:', { roomId, bookingId });
      
      const response = await deleteHotelBooking(roomId, bookingId);
      if (response.success) {
        console.log('Booking deleted successfully');
        fetchBookings(); // Refresh bookings
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleWhatsAppMessage = (phone) => {
    if (phone) {
      const message = `Hello, this is regarding your booking at our hotel.`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div className="hotel-bookings-container">
      <div className="hotel-bookings-header">
        <h1>Manage Bookings</h1>
        <div className="hotel-bookings-controls">
          <div className="filter-buttons">
            <button 
              onClick={() => setFilter('all')} 
              className={filter === 'all' ? 'active' : ''}
            >
              All Bookings
            </button>
            <button 
              onClick={() => setFilter('confirmed')} 
              className={filter === 'confirmed' ? 'active' : ''}
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
              onClick={() => setFilter('cancelled')} 
              className={filter === 'cancelled' ? 'active' : ''}
            >
              Cancelled
            </button>
          </div>
          <button 
            onClick={() => setShowWalkInModal(true)}
            className="add-walkin-btn"
          >
            Add Walk-In Booking
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found for the selected filter.</p>
        </div>
      ) : (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>
                    {booking.guest 
                      ? `${booking.guest.first_name} ${booking.guest.last_name}`
                      : booking.guestInfo?.name || 'Walk-In Guest'}
                  </td>
                  <td>
                    {booking.roomType} (#{booking.roomNumber})
                  </td>
                  <td>{formatDate(booking.checkInDate)}</td>
                  <td>{formatDate(booking.checkOutDate)}</td>
                  <td>
                    <BookingStatusBadge status={booking.status} />
                  </td>
                  <td>{formatCurrency(booking.totalPrice)}</td>
                  <td>
                    <BookingActions 
                      booking={booking}
                      onStatusUpdate={handleStatusUpdate}
                      onDelete={handleDeleteBooking}
                      onWhatsApp={handleWhatsAppMessage}
                      onViewDetails={() => setSelectedBooking(booking)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showWalkInModal && (
        <WalkInBookingModal 
          onClose={() => setShowWalkInModal(false)}
          onSuccess={() => {
            setShowWalkInModal(false);
            fetchBookings();
          }}
        />
      )}

      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default ManageBookings;