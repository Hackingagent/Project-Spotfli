import UserService from "../../../models/pivots/UserService.model.js";
import mongoose from "mongoose";
import User from "../../../models/user.model.js";
import Admin from "../../../models/admin.model.js";
import Category from "../../../models/category.model.js";
import Property from '../../../models/property.model.js';


export const getProperties = async (req, res) => {
    try {
        const {status} = req.params;
                
        const properties = await Property.find({status: status}).populate({
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
                const subcategory = category.subcategories.id(property.subcategory);


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

        

        console.log(' Properties: ', formattedProperties);

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


export const toggleProperty = async(req, res) => {
    try {
        const {id, status} = req.params;
        // const {name, fee} = req.body;
        console.log('id: ', id, 'Status: ', status);

        //Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid service ID'
            });
        }
        //Find and update service
        const property = await Property.findByIdAndUpdate(id,
            {
                status: status,
                toggledBY: req.admin
            },
            {new: true, runValidators: true}
        );

        if(!property) {
            return res.status(404).json({
                success: false,
                message: 'Service Provider application not found'
            });
        }

        let message
        if(status === 'approved'){
            message = 'Property Approved successfully'
        }else if(status === 'declined'){
            message = 'Property Declined successfully'
        }

        console.log('Message: ', message);
        res.status(200).json({
            success: true,
            message :message,
        })

    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


