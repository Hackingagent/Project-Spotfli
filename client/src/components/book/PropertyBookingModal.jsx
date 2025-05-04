import React, { useState } from 'react';
import { FaCalendarAlt, FaHome, FaUser, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';
import './property-booking.css';

const PropertyBookingModal = ({ property, showBookModal }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    guests: 1,
    specialRequests: ''
  });

  // Handle date selection
  const handleDateSelect = (date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (date > checkInDate) {
      setCheckOutDate(date);
    } else {
      setCheckInDate(date);
      setCheckOutDate(null);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle booking submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      property,
      checkInDate: checkInDate.toDateString(),
      checkOutDate: checkOutDate?.toDateString(),
      ...bookingDetails
    };
    console.log('Booking data:', bookingData);
    // Here you would typically send this data to your backend
    onClose();
  };

  // Generate calendar days
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add previous month's days if needed
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`prev-${i}`} className="calendar-day empty"></div>);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelectedAsCheckIn = checkInDate && currentDate.toDateString() === checkInDate.toDateString();
      const isSelectedAsCheckOut = checkOutDate && currentDate.toDateString() === checkOutDate.toDateString();
      const isInRange = checkInDate && checkOutDate && 
                        currentDate > checkInDate && 
                        currentDate < checkOutDate;
      const isPastDate = currentDate < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <div
          key={`day-${day}`}
          className={`
            calendar-day 
            ${isSelectedAsCheckIn ? 'check-in' : ''} 
            ${isSelectedAsCheckOut ? 'check-out' : ''}
            ${isInRange ? 'in-range' : ''}
            ${isToday ? 'today' : ''}
            ${isPastDate ? 'disabled' : ''}
          `}
          onClick={!isPastDate ? () => handleDateSelect(currentDate) : undefined}
        >
          {day}
          {isToday && <span className="today-label">Today</span>}
          {isSelectedAsCheckIn && <span className="date-label">Check-in</span>}
          {isSelectedAsCheckOut && <span className="date-label">Check-out</span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="property-booking-overlay">
      <div className="property-booking-container">
        <button className="close-btn" onClick={showBookModal}>
          <FaTimes />
        </button>

        <div className="booking-header">
          <h2><FaHome /> Book {property?.title || 'Property'}</h2>
          <p>{property?.address || 'Enter your details to book this property'}</p>
        </div>

        <div className="booking-content">
          {/* Left Section - Calendar */}
          <div className="booking-left">
            <div className="calendar-section">
              <div className="calendar-header">
                <button 
                  className="nav-btn"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                >
                  &lt;
                </button>
                <h3>
                  {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                </h3>
                <button 
                  className="nav-btn"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                >
                  &gt;
                </button>
              </div>

              <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>

              <div className="calendar-days">
                {renderCalendarDays()}
              </div>
            </div>

            <div className="selected-dates">
              <div className="date-selection">
                <label>Check-in:</label>
                <span>{checkInDate ? checkInDate.toDateString() : 'Not selected'}</span>
              </div>
              <div className="date-selection">
                <label>Check-out:</label>
                <span>{checkOutDate ? checkOutDate.toDateString() : 'Not selected'}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Form */}
          <div className="booking-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label><FaUser /> Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label><FaEnvelope /> Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label><FaPhone /> Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Guests</label>
                <select
                  name="guests"
                  value={bookingDetails.guests}
                  onChange={handleInputChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Message to Landlord</label>
                <textarea
                  name="message"
                  value={bookingDetails.message}
                  onChange={handleInputChange}
                  placeholder="Tell the landlord why you're interested in this property..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={bookingDetails.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requirements you may have..."
                  rows="3"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="book-now-btn"
                disabled={!checkInDate || !checkOutDate}
              >
                Send Booking Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBookingModal;