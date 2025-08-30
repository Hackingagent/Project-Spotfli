import UserService, { Offer } from "../../../models/pivots/UserService.model.js";
import Service from "../../../models/service.model.js";
import User from "../../../models/user.model.js";
import jwt from 'jsonwebtoken';

// Get available services for dropdown - UPDATED to match userGetService
export const getAvailableServices = async (req, res) => {
  try {
    console.log("Fetching available services...");
    
    // Fetch all services (like userGetService does)
    const services = await Service.find()
      .populate({
        path: 'addedBy',
        select: 'first_name second_name'
      })
      .sort({ name: 1 });

    console.log(`Found ${services.length} services`);
    
    // Transform the data exactly like userGetService
    const transformedServices = services.map(service => ({
      _id: service._id,
      name: service.name,
      description: service.description,
      fee: service.fee,
      addedby: service.addedBy 
        ? `${service.addedBy.first_name}` 
        : 'Unknown Admin',
      createdAt: service.createdAt
    }));

    res.status(200).json({
      success: true,
      services: transformedServices // Same structure as userGetService
    });
  } catch (error) {
    console.error("Error fetching available services:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching services",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create service application 
// Create service application 
export const createService = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Use middleware user 
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed"
      });
    }

    // Handle thumbnail upload
    let thumbnailData = null;
    if (req.file) {
      thumbnailData = {
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/services/${req.file.filename}`
      };
    }

    // Get fields from request body
    const { name, email, tell, experience, service, termsAccepted } = req.body;

    // Validate required fields
    if (!name || !email || !tell || !experience || !service) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Convert and validate number fields
    const tellValue = Number(tell);
    const experienceValue = Number(experience);
    
    if (isNaN(tellValue) || tellValue < 100000000 || tellValue > 999999999999) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be a valid number between 100000000 and 999999999999"
      });
    }

    if (isNaN(experienceValue) || experienceValue < 0 || experienceValue > 50) {
      return res.status(400).json({
        success: false,
        message: "Experience years must be between 0 and 50"
      });
    }

    // Create service application
    const newUserService = new UserService({
      name,
      email,
      status: 'pending',
      tell: tellValue,
      experience: experienceValue,
      service,
      termsAccepted: termsAccepted || false,
      user: user._id,
      thumbnail: thumbnailData,
    });

    const savedService = await newUserService.save();

    // Return response
    res.status(200).json({
      success: true,
      message: 'Service Application Submitted Successfully',
      userService: {
        _id: savedService._id,
        name: savedService.name,
        email: savedService.email,
        status: savedService.status,
        tell: savedService.tell,
        experience: savedService.experience,
        service: savedService.service,
        thumbnail: savedService.thumbnail,
        termsAccepted: savedService.termsAccepted,
        createdAt: savedService.createdAt,
      }
    });
    
  } catch (error) {
    console.error("Service creation error:", error);

    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        success: false,
        message: "Database validation failed",
        errors,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Service application already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : "Please try again later",
    });
  }
};

// Get user's service applications - UPDATED
// Get user's service applications - SIMPLIFIED
export const getMyService = async (req, res) => {
  try {
    // Use middleware user (already authenticated)
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed"
      });
    }

    const services = await UserService.find({ user: user._id })
      .populate("service", "name description")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      services: services,
      count: services.length,
    });
  } catch (error) {
    console.error("Error fetching user services:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const service = await UserService.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found or you don't have permission to update it",
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await UserService.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found or you don't have permission to delete it",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
      data: { _id: service._id },
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Create a new offer
export const createOffer = async (req, res) => {
  console.log("Request files", req.files);
  console.log("Request body", req.body);

  let imageData = [];
  try {
    const {
      title,
      description,
      price,
      experience,
      service,
      userServiceId,
      availability,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "service",
      "userServiceId",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missing: missingFields,
      });
    }
    // Check if user has approval for this service
    const userServiceDoc = await UserService.findOne({
      _id: userServiceId,
      user: req.user._id,
    }).populate("service");

    if (!userServiceDoc || userServiceDoc.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "You are not approved for this service",
      });
    }

    // Handle local file uploads (no Cloudinary)
    if (req.files && req.files.length > 0) {
      imageData = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      }));
    }

    const offer = new Offer({
      title,
      description,
      price,
      experience,
      service,
      serviceProvider: req.user._id,
      userService: userServiceDoc._id,
      images: imageData,
      availability: availability || [],
      isActive: true,
    });

    await offer.save();

    // Add offer to userService
    userServiceDoc.offers.push(offer._id);
    await userServiceDoc.save();

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: offer,
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all offers for a service provider
export const getOffer = async (req, res) => {
  try {
    const { userService, service } = req.query;
    let query = { serviceProvider: req.user._id };

    if (userService) {
      query.userService = userService;
    }

    if (service) {
      query.service = service;
    }

    const offers = await Offer.find(query)
      .populate("serviceProvider", "name email")
      .populate("service", "name description")
      .populate("userService")
      .sort({ createdAt: -1 });

    //ADD DEBUG LOGGING
    console.log("Offers retrieved:", offers.length);
    offers.forEach((offer, index) => {
      console.log(`Offer ${index}: ${offer.title}`);
      console.log(`  Images: ${offer.images ? offer.images.length : 0}`);
      if (offer.images && offer.images.length > 0) {
        console.log(`  First image URL: ${offer.images[0].url}`);
        console.log(`  First image path: ${offer.images[0].path}`);
      }
    });

    res.json({
      success: true,
      data: offers,
      count: offers.length,
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get single offer
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("serviceProvider", "name email")
      .populate("service", "name description")
      .populate("userService");

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Check if the offer belongs to the authenticated user
    if (offer.serviceProvider._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      data: offer,
    });
  } catch (error) {
    console.error("Error fetching offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an offer
export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Check if the offer belongs to the authenticated user
    if (offer.serviceProvider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    if (req.files && req.files.length > 0) {
      // Upload new local files
      const newImages = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      }));

      req.body.images = newImages;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("service", "name");

    res.json({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an offer
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Check if the offer belongs to the authenticated user
    if (offer.serviceProvider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Remove offer from userService
    await UserService.findByIdAndUpdate(offer.userService, {
      $pull: { offers: offer._id },
    });

    await Offer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Offer deleted successfully",
      data: { _id: req.params.id },
    });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
