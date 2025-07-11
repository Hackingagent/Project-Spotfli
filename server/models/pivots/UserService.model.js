import mongoose from "mongoose";

const userServiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },

    approvedBY: {
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
})

const UserService = mongoose.model('UserService', userServiceSchema);


export default UserService;