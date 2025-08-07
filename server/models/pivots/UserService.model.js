import mongoose from "mongoose";

// Availability Schema
const AvailabilitySchema = new mongoose.Schema({
  days: { 
    type: [String], 
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  }
}, { _id: false });

// Booking Schema
const BookingSchema = new mongoose.Schema({
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  timeSlot: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  contactNumber: { 
    type: String, 
    required: true 
  },
  specialRequests: { 
    type: String,
    default: '' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { 
  timestamps: true 
});

// Add indexes for better performance
BookingSchema.index({ providerId: 1, status: 1 });
BookingSchema.index({ clientId: 1 });
BookingSchema.index({ date: 1 });

// Gig Schema
const GigSchema = new mongoose.Schema({
  bookings: {
    type: BookingSchema,
    required: false
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  available: {
    type: AvailabilitySchema,
    required: false
  }
}, {
  timestamps: true
});

// UserService Schema
const userServiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
  toggledBY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined', 'suspended'],
    default: 'pending',
    required: true,
  },
  tell: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  termsAccepted: {
    type: Boolean,
    default: false,
    required: true,
  },
}, {
  timestamps: true,
});

// Create and export models
export const Booking = mongoose.model('Booking', BookingSchema);
export const Gig = mongoose.model('Gig', GigSchema);
export const UserService = mongoose.model('UserService', userServiceSchema);

// Optional: Export as object
export const Models = {
  Booking,
  Gig,
  UserService
};

export default UserService;