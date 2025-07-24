import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'email', 'data', 'dropdown', 'checkbox', 'radio'],
    },
    label: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
        sparse: true ,
    },
    isRequired: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: '',
    },
    options: {
        type: [String],
        default: [],
    },
    validation: {
        min: {type: Number},
        max: {type: Number},
        pattern: {type: String},
        minLength: { type: Number },
        maxLength: { type: Number }
    },
    displayOrder: {
        type: Number,
        default: 0
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
}, {timestamps: true});


const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { type: String },
    fields: [fieldSchema],
    isActive: {
        type: Boolean,
        default: true,
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
}, {timestamps: true});



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    subCategories: [subcategorySchema],
    isActive: {
        type: Boolean,
        default: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },

}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

export default Category;
