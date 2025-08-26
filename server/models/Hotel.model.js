import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import User from './user.model.js';

const BookingSchema = new mongoose.Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        request: true
    },
        room: {
        type: mongoose.Schema.Types.ObjectId,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    specialRequests: {
        type: String,
        trim: true
    },
    status: {
        type: String,
   enum: ['pending', 'confirmed', 'cancelled', 'completed', 'checked-in', 'checked-out'],
        default: 'confirmed'
    },
    checkedStatus: {
        type: String,
    enum: ['not checked', 'checked in', 'checked out'],
        default: 'not checked'
    },
    paymentStatus: {
        type: String,
        enum: ['pending','paid','refunded', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
    }
}, {_id: true, timestamps: true});


// Rooms Schema with bookings embeded into it 
const RoomSchema = new mongoose.Schema({ 
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ['single', 'double', 'suite', 'deluxe', 'presidential']
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  numAvailable: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  bookings: [BookingSchema] // Embedded bookings
}, { _id: true, timestamps: true });


// hotel schema joint with bookings and rooms model   
const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: [true, 'Hotel name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    amenities: {
        type: [String],
        default: []
    },
    images: [{
        type: String,
    }],
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    starRating: {
        type: Number,
        min: 1,
        max: 5
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
        rooms: [RoomSchema],
}, {
    timestamps: true
})


// code to Hash password before saving

hotelSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    // converting amenities string to array if needed
    if(this.amenities && typeof this.amenities === 'string') {
        this.amenities = this.amenities.split(',').map(item => item.trim());
    }
    next();
});

// method to compare passwords
hotelSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;