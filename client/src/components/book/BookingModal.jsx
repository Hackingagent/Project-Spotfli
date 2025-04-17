import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './booking-modal.css';

const BookingModal = ({ service, showBookModal }) => {
  const [activeTab, setActiveTab] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    location: '',
    description: '',
    contactNumber: '',
    specialRequests: ''
  });

  // Generate time slots
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
  }

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
      service,
      date: selectedDate.toDateString(),
      time: timeSlot,
      ...bookingDetails
    };
    console.log('Booking data:', bookingData);
    // Here you would typically send this data to your backend
    onClose();
  };

  // Generate calendar days
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    // Add previous month's days if needed
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`prev-${i}`} className="calendar-day empty"></div>);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const isSelected = currentDate.toDateString() === selectedDate.toDateString();
      const isToday = currentDate.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateSelect(currentDate)}
        >
          {day}
          {isToday && <span className="today-label">Today</span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-container">
        <button className="close-btn" onClick={showBookModal}>
          <FaTimes />
        </button>

        <div className="booking-header">
          <h2>Book {service?.name || 'Service'}</h2>
          <p>Fill in the details to book this service provider</p>
        </div>

        <div className="booking-content">
          {/* Left Section - Calendar */}
          <div className="booking-left">
            <div className="calendar-tabs">
              <button
                className={`tab-btn ${activeTab === 'date' ? 'active' : ''}`}
                onClick={() => setActiveTab('date')}
              >
                <FaCalendarAlt /> Select Date
              </button>
              <button
                className={`tab-btn ${activeTab === 'time' ? 'active' : ''}`}
                onClick={() => setActiveTab('time')}
                disabled={!selectedDate}
              >
                <FaClock /> Select Time
              </button>
            </div>

            {activeTab === 'date' ? (
              <div className="calendar-section">
                <div className="calendar-header">
                  <button className="nav-btn">&lt;</button>
                  <h3>
                    {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
                  </h3>
                  <button className="nav-btn">&gt;</button>
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
            ) : (
              <div className="time-slots-section">
                <h3>Available Time Slots</h3>
                <div className="time-slots-grid">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      className={`time-slot ${timeSlot === slot ? 'selected' : ''}`}
                      onClick={() => setTimeSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Booking Form */}
          <div className="booking-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label><FaMapMarkerAlt /> Service Location</label>
                <input
                  type="text"
                  name="location"
                  value={bookingDetails.location}
                  onChange={handleInputChange}
                  placeholder="Where should the service be provided?"
                  required
                />
              </div>

              <div className="form-group">
                <label><FaInfoCircle /> Problem Description</label>
                <textarea
                  name="description"
                  value={bookingDetails.description}
                  onChange={handleInputChange}
                  placeholder="Describe what you need help with..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={bookingDetails.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={bookingDetails.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special instructions for the service provider..."
                  rows="3"
                ></textarea>
              </div>

              <div className="selected-datetime">
                {selectedDate && (
                  <div className="datetime-item">
                    <FaCalendarAlt />
                    <span>{selectedDate.toDateString()}</span>
                  </div>
                )}
                {timeSlot && (
                  <div className="datetime-item">
                    <FaClock />
                    <span>{timeSlot}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="book-now-btn">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;