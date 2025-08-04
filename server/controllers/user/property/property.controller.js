import Category from '../../../models/category.model.js';
import  Property from '../../../models/property.model.js';
import fs from 'fs';


export const getUserProperties = async(req, res) => {
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


export const getSingleProperty = async(req, res) => {
    try {
        const {id} = req.params;
        console.log('ID: ', id);
        console.log('Hello i am here');

        const property = await Property.findById(id).populate({
            path: 'category',
            select: 'name',
            model: 'Category'
        })

        console.log('Property: ', property);

        res.status(200).json({
            success: true,
            property: property
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }


}


export const getPropertySubcategory = async(req, res) => {
    try {
        console.log('Hello i am here');

        const {id} = req.params;
       

        const categories = await Category.find();

        const subcategory = categories.flatMap(category => category.subCategories).find(
            sub => sub._id.toString() == id
        );

        if(!subcategory){
            return res.status(404).json({
                success: false,
                error: 'Subcategory not found',
            })
        }


        res.status(200).json({
            success: true,
            subcategory: subcategory,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false
        })
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
