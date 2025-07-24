import Admin from "../../../models/admin.model.js";
import Category from "../../../models/category.model.js";
// import { asyncHandler } from 'express-async-handler';

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

        // console.log(formattedCategories);

        res.status(200).json({
            categories: formattedCategories,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const addSubCategory = async(req, res) => {
    try {
        const {id} = req.params;
        const  {name, description} = req.body;

        const category = await Category.findById(id);

        if(!category){
            res.status(404).json({
                success: false,
                error: 'Category Not Found',
            })
        }

        category.subCategories.push({
            name,
            description,
            addedBy: req.admin,
        });
        await category.save();

        res.status(200).json({
            success: true,
            message: 'Sub category Added Successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


export const getSubCategories = async(req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id).select('subCategories').populate({
            path: 'subCategories.addedBy',
            select: 'first_name',
            model: Admin
        });

        if(!category){
            return res.status(404).json({
                success: false,
                error: 'Category Not Found',
            })
        }

        const subCategory = category.subCategories;

        const subCategories = subCategory.map(sub => ({
            id : sub._id,
            name : sub.name,
            description: sub.description,
            admin: sub.addedBy.first_name ,
        }));

        // console.log(subCategories);

        res.status(200).json({
            success: true,
            subCategories: subCategories,
        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



export const getFields = async(req, res) => {
    const category = await Category.findById(req.params.categoryId);

    if(!category){
        res.status(404);
        throw new Error('Category not found');
    }

    const subcategory = category.subCategories.id(req.params.subcategoryId);

    if(!subcategory){
        res.status(404);
        throw new Error('Subcategory not found');
    }

    res.status(200).json({
        success: true,
        fields:subcategory.fields,
    })


}


export const addField = async(req, res) => {
    const {type, label, key, isRequired, placeholder, options, validation} = req.body;

    const category = await Category.findById(req.params.categoryId);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    const subcategory = category.subCategories.id(req.params.subcategoryId);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    const displayOrder = subcategory.fields.length;


    subcategory.fields.push({
        type,
        label,
        key,
        isRequired,
        placeholder,
        options,
        validation,
        displayOrder,
        admin: req.admin,
    });

    await category.save();

    res.status(201).json({
        success: true,
        field: subcategory.fields[subcategory.fields.length - 1]
    });
}


export const addMultipleFields = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        
        // Validate request body
        if (!req.body || !req.body.fields) {
            return res.status(400).json({
                success: false,
                message: "Fields array is required in the request body"
            });
        }

        const { fields } = req.body;

        // Validate fields is an array
        if (!Array.isArray(fields)) {
            return res.status(400).json({
                success: false,
                message: "Fields must be provided as an array"
            });
        }

        // Validate each field in the array
        for (const field of fields) {
            if (!field.label || !field.key) {
                return res.status(400).json({
                    success: false,
                    message: "Each field must have a label and key"
                });
            }
        }

        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const subcategory = category.subCategories.id(req.params.subcategoryId);
        if (!subcategory) {
            return res.status(404).json({
                success: false,
                message: "Subcategory not found"
            });
        }

        // Process each field
        const addedFields = fields.map((field, index) => {
            const newField = {
                ...field,
                displayOrder: subcategory.fields.length + index,
                addedBy: req.admin._id,
                createdAt: new Date()
            };
            subcategory.fields.push(newField);
            return newField;
        });

        await category.save();

        res.status(201).json({
            success: true,
            message: `${addedFields.length} field(s) added successfully`,
            fields: addedFields,
            subcategory: {
                _id: subcategory._id,
                name: subcategory.name,
                fieldCount: subcategory.fields.length
            }
        });

    } catch (error) {
        console.error('Error in addMultipleFields:', error);
        res.status(500).json({
            success: false,
            message: "Server error while adding fields",
            error: error.message
        });
    }
};


export const updateField = async(req, res) => {

    console.log('Update Request: ', req.body);
    const {type, label, key, isRequired, placeholder, options, validation} = req.body;

    const category = await Category.findById(req.params.categoryId);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    const subcategory = category.subCategories.id(req.params.subcategoryId);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    const field = subcategory.fields.id(req.params.fieldId);

    if (!field) {
        res.status(404);
        throw new Error('Field not found');
    
    }

    field.type = type || field.type;
    field.label = label || field.label;
    field.key = key || field.key;
    field.isRequired = isRequired !== undefined ? isRequired : field.isRequired;
    field.placeholder = placeholder !== undefined ? placeholder : field.placeholder;
    field.options = options || field.options;
    field.validation = validation || field.validation;

    await category.save();

    res.json({
        success: true,
        field
    });

}


export const deleteField = async(req, res) => {
    const category = await Category.findById(req.params.categoryId);
  
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    const subcategory = category.subCategories.id(req.params.subcategoryId);
    
    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    subcategory.fields.pull({_id: req.params.fieldId});

    subcategory.fields.forEach((field, index) => {
        field.displayOrder = index;
    });

    await category.save();

    res.status(200).json({
        success: true,
        message: 'Field deleted Successfully',
    });
}

export const reorderFields = async(req, res) => {
    const {fieldOrder} = req.body;

    const category = await Category.findById(req.params.categoryId);
  
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
  
    const subcategory = category.subCategories.id(req.params.subcategoryId);
    
    if (!subcategory) {
      res.status(404);
      throw new Error('Subcategory not found');
    }


    const fieldMap = new Map();
    subcategory.fields.forEach(field => {
        fieldMap.set(field._id.toString(), field);
    });

    const reorderedFields = [];
    fieldOrder.forEach((fieldId, index) => {
        const field = fieldMap.get(fieldId);
        if (field) {
        field.displayOrder = index;
        reorderedFields.push(field);
        }
    });

    subcategory.fields = reorderedFields;
    await category.save();

    res.status(200).json({
        success: true,
        subcategory,
    })
}