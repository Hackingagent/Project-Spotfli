import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name:{
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
        ref: Admin,
    },

}, {
    timestamps: true // createdAt and updatedAt in the document
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;