import Admin from "../../../models/admin.model.js";
import Category from "../../../models/category.model.js";

export const addCategory = async(req, res) => {
    try {
        const {name} = req.body;

        const existing = await Category.findOne({name});

        if(existing) {
            return res.status(400).json({
                error: 'Category Already Exists',
            })
        }

        const category = await Category.create({
            name: name,
            addedBy: req.admin
        })

        return res.status(200).json({
            message: 'Category Added Successfully',
            category,
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const getCategory = async(req, res) => {
    try {
        const categories = await Category.find({ isActive: true }).populate({
            path: 'addedBy',
            select: 'first_name',
            model: Admin
        });

        console.log(categories)

        const formattedCategories = categories.map(category => ({
            id: category._id,
            name: category.name,
            admin: category.addedBy.first_name,
        }));

        console.log(formattedCategories);

        res.status(200).json({
            categories: formattedCategories,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}