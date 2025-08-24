import './css/BookingStatusBadge.css';

const BookingStatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'confirmed':
        return 'reserved';
      case 'checked-in':
        return 'checked-in';
      case 'checked-out':
        return 'checked-out';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default BookingStatusBadge;