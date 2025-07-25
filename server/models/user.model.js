import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        unique: true,
        lowercase: true,
        required: true,
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

    is_email_verified:{
        type: Boolean,
        default: false,        
    },

    online:{
        type: Boolean,
        default: false,
    },

    password:{
        type: String,
        required: true,
        select: false,
    },

    is_service_provider: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no',
        required: true,
    },
    // Approval tracking for property owners
    owner_approved: {
        status: {
            type: String,
            enum: ['not_set', 'pending', 'approved', 'rejected'],
            default: 'not_set'
        },
        approved_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        approved_at: Date,
        rejection_reason: String
    },

    // Track which admin last updated the user
    last_updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    

    //
    role: {
        type: String,
        enum: ['user', 'service_provider', 'admin'], default: 'user'
    },
isApprovedProvider: {
    type: Boolean, 
    default: false
}

}, {
    timestamps: true // createdAt and updatedAt in the document
});

const User = mongoose.model('User', userSchema);

export default User;