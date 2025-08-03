import  Property from '../../../models/property.model.js';
import fs from 'fs';


export const getProperties = async(req, res) => {
    try {
        const userId = req.user;
        console.log("User Id", userId);

        const properties = await Property.find({user: userId}).populate({
            path: 'category',
            select: 'name',
            model: 'Category'
        }).sort({ createdAt: -1 }).lean();

        console.log('Properties: ', properties);

        
        res.status(200).json({
            success: true,
            properties: properties,
        })


    } catch (error) {
        console.error('Error fetching user properties:', error);
        res.status(500).json({
        success: false,
        message: 'Server error while fetching properties',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
  
    }
}


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
