import mongoose from "mongoose";

const propertyRoomSchema = new mongoose.Schema({

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    roomType:{
        type: String,
        required: false,
    },

    livingRoom: {
        type: Number,
        required: false,
    },
    bedRoom: {
        type: Number,
        required: false,
    },
    toilet: {
        type: Number,
        required: false,
    },
    kitchen: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: [true, 'Price is Required'],
    },
    description: {
        type: String,
        required: false,
        default: 0,
    },
    quantityAvailable: {
        type: Number,
        required: [true, 'Quantity is Required'],
    },
    amenities: {
        type: [String],
        default: []
    },
    files: [{
        fieldKey: String,    // Which form field this file belongs to
        originalName: String,
        mimeType: String,
        size: Number,
        url: String,        // URL to access the file
        path: String,       // Server storage path (if storing locally)
        uploadedAt: {
        type: Date,
        default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['draft', 'available', 'occupied'],
        default: 'available'
    },


}, {
    timestamps: true // createdAt and updatedAt in the document
});

const PropertyRoom = mongoose.model('PropertyRoom', propertyRoomSchema);

export default PropertyRoom;