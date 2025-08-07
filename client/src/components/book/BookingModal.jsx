import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle, FaTimes, FaCheck, FaUser, FaPhone } from 'react-icons/fa';
import './booking-modal.css';
import { createBooking } from '../../api/user/serviceProvider/my-booking';

const BookingModal = ({ service, showBookModal }) => {
  // Validate service prop
  if (!service || !service._id) {
    return (
      <div className="booking-modal-overlay">
        <div className="booking-modal-container error-state">
          <button className="close-btn" onClick={showBookModal}>
            <FaTimes />
          </button>
          <div className="booking-error">
            <p>Service information is not available.</p>
            <button onClick={showBookModal} className="retry-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [timeSlot, setTimeSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [bookingDetails, setBookingDetails] = useState({
    location: '',
    description: '',
    contactNumber: '',
    specialRequests: ''
  });

  // Generate time slots (8AM to 8PM)
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setActiveTab('time');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = [];
    if (!timeSlot) validationErrors.push('Please select a time slot');
    if (!bookingDetails.location) validationErrors.push('Location is required');
    if (!bookingDetails.description) validationErrors.push('Description is required');
    if (!bookingDetails.contactNumber) validationErrors.push('Contact number is required');

    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Format date for backend (YYYY-MM-DD)
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        date: formattedDate,
        timeSlot,
        clientDetails: {
          ...bookingDetails,
          bookingDate: new Date().toISOString()
        },
        status: 'pending'
      };

      const response = await createBooking(bookingData);
      
      if (response.success) {
        setSubmitSuccess(true);
      } else {
        throw new Error(response.error || 'Booking failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar rendering logic
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`prev-${i}`} className="calendar-day empty"></div>);
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isSelected = currentDate.toDateString() === selectedDate.toDateString();
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isPast = currentDate < new Date() && !isToday;

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day 
            ${isSelected ? 'selected' : ''} 
            ${isToday ? 'today' : ''}
            ${isPast ? 'past' : ''}`}
          onClick={() => !isPast && handleDateSelect(currentDate)}
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

        {submitSuccess ? (
          <div className="booking-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h3>Booking Confirmed!</h3>
            <div className="booking-summary">
              <p><strong>Service:</strong> {service.name}</p>
              <p><FaCalendarAlt /> <strong>Date:</strong> {selectedDate.toDateString()}</p>
              <p><FaClock /> <strong>Time:</strong> {timeSlot}</p>
              <p><FaMapMarkerAlt /> <strong>Location:</strong> {bookingDetails.location}</p>
              <p><FaUser /> <strong>Contact:</strong> {bookingDetails.contactNumber}</p>
            </div>
            <button 
              className="btn-primary"
              onClick={showBookModal}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="booking-header">
              <h2>Book {service.name}</h2>
              <p className="subtitle">Schedule your service appointment</p>
              {error && (
                <div className="booking-error">
                  <FaInfoCircle /> {error}
                </div>
              )}
            </div>

            <div className="booking-content">
              <div className="booking-left">
                <div className="tabs">
                  <button
                    className={`tab ${activeTab === 'date' ? 'active' : ''}`}
                    onClick={() => setActiveTab('date')}
                  >
                    <FaCalendarAlt /> Date
                  </button>
                  <button
                    className={`tab ${activeTab === 'time' ? 'active' : ''}`}
                    onClick={() => setActiveTab('time')}
                    disabled={!selectedDate}
                  >
                    <FaClock /> Time
                  </button>
                </div>

                {activeTab === 'date' ? (
                  <div className="calendar-container">
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

                    <div className="weekdays">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="weekday">{day}</div>
                      ))}
                    </div>

                    <div className="calendar-days">
                      {renderCalendarDays()}
                    </div>
                  </div>
                ) : (
                  <div className="time-slots-container">
                    <h3>Select Time Slot</h3>
                    <div className="time-slots-grid">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          className={`time-slot-btn ${timeSlot === slot ? 'selected' : ''}`}
                          onClick={() => setTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="booking-right">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label><FaMapMarkerAlt /> Service Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={bookingDetails.location}
                      onChange={handleInputChange}
                      placeholder="Where should we provide the service?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label><FaInfoCircle /> Service Description *</label>
                    <textarea
                      name="description"
                      value={bookingDetails.description}
                      onChange={handleInputChange}
                      placeholder="Describe what you need..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label><FaPhone /> Contact Number *</label>
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
                      placeholder="Any special instructions..."
                      rows="3"
                    />
                  </div>

                  <div className="selected-info">
                    {selectedDate && (
                      <div className="info-item">
                        <FaCalendarAlt />
                        <span>{selectedDate.toDateString()}</span>
                      </div>
                    )}
                    {timeSlot && (
                      <div className="info-item">
                        <FaClock />
                        <span>{timeSlot}</span>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;