import  Property from '../../../models/property.model.js';
import fs from 'fs';


export const addProperty = async(req, res) => {

    try {
        const {category, subcategory, ...formData} = req.body;

        const uploadFiles = req.files || [];

        const files = uploadFiles.map(file => ({
            url: `/uploads/properties/${file.filename}`,
            path: file.path,
            originalName: file.originalName,
            mimeType: file.mimeType,
            size: file.size
        }));

        const newProperty = new Property({
            category,
            subcategory,
            data: formData,
            files: files,
            status: 'submitted',
            user: req.user
        })

        await newProperty.save();

        res.status(200).json({
            json: true,
            message: 'Property Submitted Successfully',
        })




    } catch (error) {
        // / Cleanup uploaded files if error occurs
        if (req.files) {
            req.files.forEach(file => {
            fs.unlinkSync(file.path);
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}
