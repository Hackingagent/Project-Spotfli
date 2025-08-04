// models/Submission.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toggledBY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
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
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'submitted'
  },
  notes: String
}, { timestamps: true });


const Property = mongoose.model('Property', propertySchema);

export default Property;