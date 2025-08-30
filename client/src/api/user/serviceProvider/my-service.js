import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/service-provider",
  timeout: 10000,
});

// Create service (for service provider application)
export const createService = async (serviceData) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    const response = await api.post("/", serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // FIX: Return the response data directly (not response.data.data)
    return { 
      success: true, 
      data: response.data // Changed from response.data.data
    };
    
  } catch (error) {
    console.error("Error creating service:", error);
    return {
      success: false,
      error: error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to create service"
    };
  }
};
// Get services (for dropdown selection) - FIXED
export const userGetServices = async () => {
  const token = localStorage.getItem("user_token");
  try {
    console.log("Fetching available services from API...");
    const response = await api.get("/available-services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Services API response:", response.data);
    
    if (response.data.success) {
      return {
        success: true,
        services: response.data.services || [] 
      };
    } else {
      return {
        success: false,
        error: response.data.message || "Failed to load services"
      };
    }
  } catch (error) {
    console.error("Error in userGetServices:", error);
    return {
      success: false,
      error: error.response?.data?.message || 
            "Failed to load services. Please check your connection."
    };
  }
};

// Get user's services (their applications) - FIXED
export const getService = async () => {
  const token = localStorage.getItem("user_token");
  try {
    const response = await api.get("/my-service", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // FIX: Handle the correct response structure
    const servicesData = response.data.services || response.data.data || [];
    
    return {
      success: true,
      service: servicesData, // Changed to match backend response
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to load your services",
    };
  }
};

// ... keep the rest of your API functions (createOffer, getOffer, updateOffer, deleteOffer, getOfferById) as they are

// // Update user service
// export const updateService = async (id, updated) => {
//   try {
//     const token = localStorage.getItem("user_token");
//     console.log("Token: ", token);
//     const response = await api.put(`/service-provider/${id}`, updated, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("Response after edit, ", response);
//     return {
//       success: true,
//       message: response.data.message,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

//Delete a service
// export const deleteService = async (id) => {
//   try {
//     const token = localStorage.getItem("user_token");

//     const response = await api.delete(`service-provider/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(response);
//     return {
//       success: true,
//       message: response.data.message,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };


//Create User Service Offer
export const createOffer = async (offerData) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    // Debug FormData contents
    console.log("Sending Offer FormData:");
    if (offerData instanceof FormData) {
      for (let [key, value] of offerData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }
    }

    const response = await api.post("/offers", offerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data: response.data };
    
  } catch (error) {
    console.error("Full error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config
    });
    
    return {
      success: false,
      error: error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to create offer"
    };
  }
};

// Get All Offers for Service Provider
export const getOffer = async (queryParams = {}) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    const response = await api.get("/offers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams
    });

     console.log("Offers API response:", response.data);

    return {
      success: true,
      offers: response.data.data,
      count: response.data.count
    };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return {
      success: false,
      error: error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to fetch offers"
    };
  }
};

// Get Single Offer by ID
// export const getMyOfferById = async (offerId) => {
//   const token = localStorage.getItem("user_token");
  
//   if (!token) {
//     return { success: false, error: "No authentication token" };
//   }

//   try {
//     const response = await api.get(`/offers/${offerId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return {
//       success: true,
//       offer: response.data.data,
//     };
//   } catch (error) {
//     console.error("Error fetching offer:", error);
//     return {
//       success: false,
//       error: error.response?.data?.message || 
//             error.response?.data?.error || 
//             "Failed to fetch offer"
//     };
//   }
// };

// Update Offer
export const updateOffer = async (offerId, offerData) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    // Debug FormData contents if it's a FormData object
    if (offerData instanceof FormData) {
      console.log("Sending Update FormData:");
      for (let [key, value] of offerData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }
    }

    const response = await api.patch(`/offers/${offerId}`, offerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": offerData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });

    return { success: true, data: response.data };
    
  } catch (error) {
    console.error("Full error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config
    });
    
    return {
      success: false,
      error: error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to update offer"
    };
  }
};

// Delete Offer
export const deleteOffer = async (offerId) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    const response = await api.delete(`/offers/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
    
  } catch (error) {
    console.error("Error deleting offer:", error);
    return {
      success: false,
      error: error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to delete offer"
    };
  }
};

// Get Offers by Service ID
export const getOfferById = async (serviceId) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    const response = await api.get(`/offers/service/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      offers: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching offers by service:", error);
    return {
      success: false,
      error: error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to fetch offers for this service"
    };
  }
};