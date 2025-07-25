import mongoose from "mongoose";



const AvailabilityScheme = new mongoose.Schema({
days: {type: Date, required: true},
time: {type: Date, required: true},
}); 

const BookingSchema = new mongoose.Schema({
// gigId: {type: Schema.Types.ObjectId, ref: 'Gig', required: true},
clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
time: {type: Date, required: true},
date: {type: Date, required: true},
});

const GigSchema = new mongoose.Schema({
    bookings: {BookingSchema},
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
  Image: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  available: {AvailabilityScheme},
},
{
    timestamps: true // createdAt and updatedAt in the document
}
);

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

    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: false,
    },

    status: {
        type: String,
        enum: ['pending','approved', 'declined','suspended'],
        default: 'pending',
        required: true,
    },

    tell:{
        type: Number,
        required: true,
    },

    experience:{
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

const UserService = mongoose.model('UserService', userServiceSchema);


export default UserService;