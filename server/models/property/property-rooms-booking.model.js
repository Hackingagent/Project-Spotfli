import mongoose from "mongoose";

const propertyRoomBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        request: true
    },
    room: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyRoom',
    },
    checkInMonth: {
        type: String,
        required: true,
    },
    number: {
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


}, {
    timestamps: true // createdAt and updatedAt in the document
});

const PropertyRoomBooking = mongoose.model('PropertyRoomBooking', propertyRoomBookingSchema);

export default PropertyRoomBooking;