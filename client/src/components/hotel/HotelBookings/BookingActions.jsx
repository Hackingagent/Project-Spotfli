import { FaWhatsapp, FaTrash, FaEye, } from 'react-icons/fa';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import './css/BookingActions.css';

const BookingActions = ({ booking, onStatusUpdate, onDelete, onWhatsApp, onViewDetails }) => {
  const handleCheckIn = () => {
    onStatusUpdate(booking.roomId, booking._id, { 
      status: 'checked-in',
      checkedStatus: 'checked in' 
    });
  };

  const handleCheckOut = () => {
    onStatusUpdate(booking.roomId, booking._id, { 
      status: 'checked-out',
      checkedStatus: 'checked out' 
    });
  };

  return (
    <div className="booking-actions">
      <button 
        onClick={onViewDetails}
        className="action-btn view-btn"
        title="View Details"
      >
        <i className="fa fa-eye"></i>
      </button>
      
      {booking.guest?.phone && (
        <button 
          onClick={() => onWhatsApp(booking.guest.phone)}
          className="action-btn whatsapp-btn"
          title="Message on WhatsApp"
        >
          <i className="fa fa-whatsapp"></i>
        </button>
      )}
      
      {booking.status === 'confirmed' && (
        <button 
          onClick={handleCheckIn}
          className="action-btn checkin-btn"
          title="Check In"
        >
         <i class="fas fa-sign-in-alt"></i>
        </button>
      )}
      
      {booking.status === 'checked-in' && (
        <button 
          onClick={handleCheckOut}
          className="action-btn checkout-btn"
          title="Check Out"
        >
         <i class="fa fa-arrow-right-to-bracket"></i>
        </button>
      )}
      
      <button 
        onClick={() => onDelete(booking.roomId, booking._id)}
        className="action-btn delete-btn"
        title="Delete Booking"
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};

export default BookingActions;