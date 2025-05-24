import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },

    last_name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    tell:{
        type: Number,
        required: false,
    },

    profile:{
        type: String,
        required: false,
    },

    dob:{
        type: String,
        required: false,
    },

    verification_code:{
        type: Number,
        default: null,
        required: false,
    },

    is_verified:{
        type: Boolean,
        default: false,
    },

    password:{
        type: String,
        required: true,
        select: false,
    },

    role:{
        type: String,
        enum: ['super', 'admin'],
        default: 'admin',
        required: true,
    },

    approved_services: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        approved_at: Date
    }],
    
    approved_owners: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        approved_at: Date
    }],


}, {
    timestamps: true // createdAt and updatedAt in the document
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;