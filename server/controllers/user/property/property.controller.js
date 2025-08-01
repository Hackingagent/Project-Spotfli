import  Property from '../../../models/property.model.js';


export const addProperty = async(req, res) => {
    try {
        const {category, subcategory, data} = req.body;

        const userId = req.user;

        if(!category || !subcategory || !data){
            return res.status(400).json({
                error: 'Missing required fields',
            })
        }

        const property = new Property({
            
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}
