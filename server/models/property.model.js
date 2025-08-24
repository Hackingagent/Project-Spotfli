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
    enum: ['draft', 'submitted', 'approved', 'declined'],
    default: 'submitted'
  },
  notes: String
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for rooms
propertySchema.virtual('rooms', {
  ref: 'PropertyRoom',       // Reference model
  localField: '_id',         // Field in Property
  foreignField: 'property',  // Field in PropertyRoom
  options: { 
    sort: { createdAt: -1 }  // Default sorting
  }
});

// Indexes for better performance
propertySchema.index({ user: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ 'data.name': 'text' });


const Property = mongoose.model('Property', propertySchema);

export default Property;