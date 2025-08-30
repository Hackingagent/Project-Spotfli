import UserService from "../../../models/pivots/UserService.model.js";


// Book a service (for client)
export const createBooking = async (req, res) => {
  try {
    const { serviceId, date, timeSlot, location, description, contactNumber, specialRequests } = req.body;
    const clientId = req.user._id;

    // Validate required fields
    if (!serviceId || !date || !timeSlot || !location || !description || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

    // Get the service/service details
    const service = await UserService.findById(serviceId)
      .populate('createdBy', 'name email');
    
    if (!serviceId) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    // Create new booking
    const booking = new Booking({
      service: serviceId,
      serviceName: service.title,
      provider: service.createdBy._id,
      client: clientId,
      date,
      timeSlot,
      status: 'pending',
      clientDetails: {
        location,
        description,
        contactNumber,
        specialRequests: specialRequests || '',
        bookedAt: new Date()
      },
      price: service.price
    });

    await booking.save();

     res.status(201).json({
      success: true,
      booking: {
        id: booking._id,
        serviceName: service.title,
        provider: service.createdBy,
        date,
        timeSlot,
        status: 'pending',
        price: service.price,
        clientDetails: booking.clientDetails
      }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking'
    });
  }
};

// Get all bookings for a provider
export const getProviderBookings = async (req, res) => {
  try {
    const providerId = req.user._id;
    
    const bookings = await Booking.find({ provider: providerId })
      .populate('client', 'name email avatar')
      .populate('service', 'title price')
      .sort({ date: -1, createdAt: -1 });

    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      serviceName: booking.serviceName,
      service: booking.service,
      client: booking.client,
      date: booking.date,
      timeSlot: booking.timeSlot,
      status: booking.status,
      price: booking.price,
      location: booking.clientDetails?.location,
      description: booking.clientDetails?.description,
      contactNumber: booking.clientDetails?.contactNumber,
      specialRequests: booking.clientDetails?.specialRequests,
      bookedAt: booking.clientDetails?.bookedAt
    }));

    res.json({
      success: true,
      bookings: formattedBookings
    });
  } catch (error) {
    console.error('Error fetching provider bookings:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings'
    });
  }
};

// Get all bookings for a client
export const getClientBookings = async (req, res) => {
  try {
    const clientId = req.user._id;
    
    const bookings = await Booking.find({ client: clientId })
      .populate('provider', 'name email avatar')
      .populate('service', 'title price')
      .sort({ date: -1, createdAt: -1 });

    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      serviceName: booking.serviceName,
      service: booking.service,
      provider: booking.provider,
      date: booking.date,
      timeSlot: booking.timeSlot,
      status: booking.status,
      price: booking.price,
      location: booking.clientDetails?.location,
      description: booking.clientDetails?.description,
      contactNumber: booking.clientDetails?.contactNumber,
      specialRequests: booking.clientDetails?.specialRequests,
      bookedAt: booking.clientDetails?.bookedAt
    }));

    res.json({
      success: true,
      bookings: formattedBookings
    });
  } catch (error) {
    console.error('Error fetching client bookings:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings'
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Find and update booking
    const booking = await Booking.findOneAndUpdate(
      { 
        _id: req.params.id,
        $or: [
          { provider: userId },  // Provider can update
          { client: userId },    // Client can cancel
          { role: 'admin' }      // Admin can update
        ]
      },
      { status },
      { new: true }
    )
    .populate('client', 'name email')
    .populate('provider', 'name email')
    .populate('service', 'title price');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or unauthorized'
      });
    }

    res.json({
      success: true,
      booking: {
        id: booking._id,
        serviceName: booking.serviceName,
        status: booking.status,
        date: booking.date,
        timeSlot: booking.timeSlot,
        client: booking.client,
        provider: booking.provider,
        price: booking.price
      }
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update booking status'
    });
  }
};