import { FaWhatsapp, FaPhone, FaEnvelope, FaUser, FaDoorOpen, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';
import './css/BookingDetailsModal.css';

const BookingDetailsModal = ({ booking, onClose, onStatusUpdate }) => {
  const handleStatusChange = (newStatus) => {
    if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
      let statusData = {};
      
      if (newStatus === 'checked-in') {
        statusData = { status: 'checked-in', checkedStatus: 'checked in' };
      } else if (newStatus === 'checked-out') {
        statusData = { status: 'checked-out', checkedStatus: 'checked out' };
      } else {
        statusData = { status: newStatus };
      }
      
      onStatusUpdate(booking.roomId, booking._id, statusData);
      onClose();
    }
  };

  const handleWhatsApp = () => {
    if (booking.guest?.phone) {
      const message = `Hello ${booking.guest.first_name}, this is regarding your booking at our hotel.`;
      window.open(`https://wa.me/${booking.guest.phone}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  // Calculate nights and price per night
  const nights = Math.ceil(
    (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
  );
  const pricePerNight = booking.totalPrice / nights;

  return (
    <div className="modal-overlay">
      <div className="booking-details-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Booking Details</h2>
        
        <div className="booking-details-grid">
          <div className="detail-section guest-info">
            <h3>
              <FaUser /> Guest Information
            </h3>
            {booking.guest ? (
              <>
                <p><strong>Name:</strong> {booking.guest.first_name} {booking.guest.last_name}</p>
                <p><strong>Email:</strong> {booking.guest.email}</p>
                <p><strong>Phone:</strong> {booking.guest.phone}</p>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {booking.guestInfo?.name || 'Walk-In Guest'}</p>
                {booking.guestInfo?.email && <p><strong>Email:</strong> {booking.guestInfo.email}</p>}
                {booking.guestInfo?.phone && <p><strong>Phone:</strong> {booking.guestInfo.phone}</p>}
              </>
            )}
            
            {(booking.guest?.phone || booking.guestInfo?.phone) && (
              <div className="contact-actions">
                <button onClick={handleWhatsApp} className="whatsapp-btn">
                  <FaWhatsapp /> WhatsApp
                </button>
                {booking.guest?.phone && (
                  <a href={`tel:${booking.guest.phone}`} className="call-btn">
                    <FaPhone /> Call
                  </a>
                )}
                {booking.guest?.email && (
                  <a href={`mailto:${booking.guest.email}`} className="email-btn">
                    <FaEnvelope /> Email
                  </a>
                )}
              </div>
            )}
          </div>
          
          <div className="detail-section booking-info">
            <h3>
              <FaDoorOpen /> Room Information
            </h3>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
            <p><strong>Room Number:</strong> {booking.roomNumber}</p>
            <p><strong>Capacity:</strong> {booking.guests || 1} person(s)</p>
          </div>
          
          <div className="detail-section dates-info">
            <h3>
              <FaCalendarAlt /> Dates
            </h3>
            <p><strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            <p><strong>Nights:</strong> {nights}</p>
          </div>
          
          <div className="detail-section financial-info">
            <h3>
              <FaMoneyBillWave /> Financials
            </h3>
            <p><strong>Price per night:</strong> XAF {pricePerNight.toLocaleString()}</p>
            <p><strong>Total Price:</strong> XAF {booking.totalPrice.toLocaleString()}</p>
            <p><strong>Payment Status:</strong> <span className={`status-badge ${booking.paymentStatus}`}>
              {booking.paymentStatus}
            </span></p>
          </div>
          
          {booking.specialRequests && (
            <div className="detail-section requests-info">
              <h3>
                <FaInfoCircle /> Special Requests
              </h3>
              <p>{booking.specialRequests}</p>
            </div>
          )}
        </div>
        
        <div className="status-actions">
          <h3>Update Status</h3>
          <div className="status-buttons">
            {booking.status === 'confirmed' && (
              <button 
                onClick={() => handleStatusChange('checked-in')}
                className="checkin-btn"
              >
                Check In
              </button>
            )}
            {booking.status === 'checked-in' && (
              <button 
                onClick={() => handleStatusChange('checked-out')}
                className="checkout-btn"
              >
                Check Out
              </button>
            )}
            {(booking.status === 'confirmed' || booking.status === 'checked-in') && (
              <button 
                onClick={() => handleStatusChange('cancelled')}
                className="cancel-btn"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;