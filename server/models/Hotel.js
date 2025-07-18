import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, {
    timestamps: true
})


// code to Hash password befor saving

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