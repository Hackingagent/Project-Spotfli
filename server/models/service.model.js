import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    fee: {
        type: String,
        required: false,
        default: 0,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
}, {
    timestamps: true // createdAt and updatedAt in the document
});

// Check if the model already exists
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;