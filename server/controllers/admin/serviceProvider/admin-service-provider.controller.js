import UserService from "../../../models/pivots/UserService.model.js";
import Service from "../../../models/service.model.js";
import User from "../../../models/user.model.js";
import mongoose from "mongoose";

export const getProviders = async (req, res) => {
  try {
    const providers = await UserService.find()
      .populate('user', 'firstName lastName email')
      .populate('service', 'name price');
      
    res.status(200).json({
      success: true,
      count: providers.length,
      providers
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service providers'
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { serviceId, date, timeSlot, location, description, contactNumber, specialRequests } = req.body;
    
    // Validate required fields
    if (!serviceId || !date || !timeSlot || !location || !description || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate date is in the future
    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Booking date must be in the future'
      });
    }

    // Get service to find provider
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if user is trying to book their own service
    if (service.createdBy.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot book your own service'
      });
    }

    const booking = new Booking({
      serviceId,
      providerId: service.createdBy,
      clientId: req.user.id,
      date: new Date(date),
      timeSlot,
      location,
      description,
      contactNumber,
      specialRequests: specialRequests || '',
      status: 'pending'
    });

    await booking.save();

    // Populate data for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('serviceId', 'name price')
      .populate('providerId', 'firstName lastName email')
      .populate('clientId', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: populatedBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { providerId: req.user.id };
    
    if (status && ['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('serviceId', 'name price')
      .populate('clientId', 'firstName lastName email')
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    console.error('Error fetching provider bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};

export const getClientBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { clientId: req.user.id };
    
    if (status && ['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('serviceId', 'name price')
      .populate('providerId', 'firstName lastName email')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    console.error('Error fetching client bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID'
      });
    }

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    .populate('serviceId', 'name price')
    .populate('clientId', 'firstName lastName email')
    .populate('providerId', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      booking
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status'
    });
  }
};

export const toggleProvider = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid provider ID'
      });
    }

    const provider = await UserService.findById(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    provider.isActive = !provider.isActive;
    await provider.save();

    res.status(200).json({
      success: true,
      message: `Provider ${provider.isActive ? 'activated' : 'deactivated'}`,
      provider
    });
  } catch (error) {
    console.error('Error toggling provider:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle provider status'
    });
  }
};

// Single export statement at the end
export default {
  getProviders,
  createBooking,
  getProviderBookings,
  getClientBookings,
  updateBookingStatus,
  toggleProvider
};