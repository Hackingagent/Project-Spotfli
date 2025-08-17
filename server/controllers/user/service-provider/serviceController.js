import UserService from "../../../models/pivots/UserService.model.js";

export const createService = async (req, res) => {
  try {
    // 1. Debug incoming request
    console.log("=== INCOMING REQUEST ===");
    console.log("Headers:", req.headers);
    console.log("Authenticated user ID:", req.user?._id);
    console.log("Request body:", req.body);
    console.log("Files received:", req.files || 'No files uploaded');

    // 2. Validate required fields
    const requiredFields = {
      tell: "Phone number",
      experience: "Experience years",
      pricePerDay: "Price per day",
      name: "Service name",
      description: "Description"
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([field]) => !req.body[field])
      .map(([_, name]) => name);

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res.status(400).json({
        message: "Missing required fields",
        missing: missingFields,
        receivedFields: Object.keys(req.body)
      });
    }

    // 3. Convert and validate number fields
    const numberFields = {
      tell: { min: 100000000, max: 999999999999, name: "Phone number" },
      experience: { min: 0, max: 50, name: "Experience years" },
      pricePerDay: { min: 1, name: "Price per day" }
    };

    const validationErrors = [];
    const parsedData = { ...req.body, user: req.user._id };

    for (const [field, config] of Object.entries(numberFields)) {
      const value = Number(req.body[field]);
      
      if (isNaN(value)) {
        validationErrors.push(`${config.name} must be a valid number`);
        continue;
      }

      if (config.min !== undefined && value < config.min) {
        validationErrors.push(`${config.name} must be at least ${config.min}`);
      }

      if (config.max !== undefined && value > config.max) {
        validationErrors.push(`${config.name} cannot exceed ${config.max}`);
      }

      parsedData[field] = value;
    }

    if (validationErrors.length > 0) {
      console.log("Validation errors:", validationErrors);
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors
      });
    }

    // 4. Handle file uploads
    const images = req.files?.map(file => ({
      path: file.path,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size
    })) || [];

    // 5. Create service offer
    const offer = new UserService({
      ...parsedData,
      images
    });

    console.log("Creating service with data:", offer);

    const savedOffer = await offer.save();
    console.log("Service created successfully:", savedOffer._id);

    // 6. Format response
    const response = {
      success: true,
      data: {
        _id: savedOffer._id,
        name: savedOffer.name,
        description: savedOffer.description,
        pricePerDay: savedOffer.pricePerDay,
        tell: savedOffer.tell,
        experience: savedOffer.experience,
        days: savedOffer.days,
        images: savedOffer.images.map(img => ({
          url: `/uploads/${img.filename}`,
          ...img
        })),
        createdAt: savedOffer.createdAt
      }
    };

    res.status(201).json(response);

  } catch (error) {
    // 7. Enhanced error handling
    console.error("!!! SERVICE CREATION ERROR !!!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    if (error.name === 'ValidationError') {
      const errors = {};
      for (const field in error.errors) {
        console.error(`Field ${field} failed validation:`, error.errors[field]);
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        message: "Database validation failed",
        errors,
        receivedData: req.body
      });
    }

    if (error.code === 11000) { // Duplicate key error
      console.error("Duplicate key error:", error.keyValue);
      return res.status(409).json({
        message: "Service already exists",
        conflictingFields: error.keyValue
      });
    }

    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Please try again later',
      requestId: req.requestId // If you have request tracking
    });
  }
};


//Get user services
export const getMyService = async (req, res) => {
  try {

    const services = await UserService.find({ user: req.user });
    console.log(services);
    
    res.status(200).json({
      success: true,
      service: services,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Udpdate a service
export const updateService = async (req, res) => {
  try {
    const gig = await UserService.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.body.id },
      res.body,
      { new: true }
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    res.json(gig);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const gig = await UserService.findByIdAndDelete({
      _id: req.params.id,
      createdBy: req.body.id,
    });
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    res.json({message: "Gig deleted success successfully"})
  } catch (error) {
    res.status(500).json({message: "Server error"})
  }
};
