import Category from '../../../models/category.model.js';
import  Property from '../../../models/property.model.js';
import fs from 'fs';

export const getAllProperties = async (req, res) => {
    try {
        // const {status} = req.params;
                
        const properties = await Property.find({status: approved}).populate({
           path: 'user',
           select: 'first_name last_name email tell',
           model: User,
        }).populate({
            path: 'category',
            select: 'name',
            model: Category,
        }).populate({
            path: 'toggledBY',
            select: 'first_name',
            model: Admin,
        }).sort({ createdAt: -1 });



        const formattedProperties = await Promise.all(
            properties.map(async (property) => {
                const category = await Category.findById(property.category);
                const subcategory = category.subCategories.id(property.subcategory);


                return {
                    ...property.toObject(),
                    category: {
                        _id: property.category._id,
                        name: property.category.name,
                        isActive: property.category.isActive,
                    },

                    subcategory: subcategory ? {
                        _id: subcategory._id,
                        name: subcategory.name,                      
                    } : null,
                    user: `${property.user?.first_name} ${property.user.last_name}`,
                    userDetails: property.user,
                    admin: property.toggledBY?.first_name,
                    
                }
            })
        )

        

        console.log('Pending Properties: ', formattedProperties);

        res.status(200).json({
            success: true,
            properties:formattedProperties
        })


    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}


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

        const property = await Property.findById(id).populate({
            path: 'category',
            select: 'name',
            model: 'Category'
        })


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

        const subcategory = categories.flatMap(category => category.subcategories).find(
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



export const updateProperty = async(req, res) => {
    try {

        const {id} = req.params;
        const data = req.body;

        const property = await Property.findByIdAndUpdate(id,
            {
                data: data,
            }, 

            {new: true, runValidators: true}

        )

        if(!property){
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Property updated successfully',
            property: property
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}


export const deletePropertyFile = async(req, res) => {
    try{
        const {id, fileId} = req.params;


        const updatedProperty = await Property.findByIdAndUpdate(id, {
            $pull: {files: {_id: fileId}}
        },{new: true});

        if(!updateProperty){
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            })
        }


        res.status(200).json({
            success: true,
            message: 'File Deleted Successfully'
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

export const dashboardInfo = async (req, res) => {
    
}