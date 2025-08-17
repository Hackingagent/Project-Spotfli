import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/service-provider",
  timeout: 10000,
});

//Create user Service offers

export const createMyService = async (serviceData) => {
  const token = localStorage.getItem("user_token");
  
  if (!token) {
    return { success: false, error: "No authentication token" };
  }

  try {
    // Debug FormData contents
    console.log("Sending FormData:");
    if (serviceData instanceof FormData) {
      for (let [key, value] of serviceData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }
    }

    const response = await api.post("/", serviceData, {
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
            "Failed to create service"
    };
  }
};

// Get User Service
export const getMyService = async () => {
  const token = localStorage.getItem("user_token");
  try {
    const response = await api.get("/my-service", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return {
      success: true,
      service: response.data.service,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

// Update user service
export const updateService = async (id, updated) => {
  try {
    const token = localStorage.getItem("user_token");
    console.log("Token: ", token);
    const response = await api.put(`${id}`, updated, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response after edit, ", response);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//Delete a service
export const deleteService = async (id) => {
  try {
    const token = localStorage.getItem("user_token");

    const response = await api.delete(`${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
