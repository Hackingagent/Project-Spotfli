import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/bookings",
  timeout: 10000,
});

// Create new booking
export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("user_token");
  try {
    const response = await api.post("/", bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Booking creation error:", error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create booking",
    };
  }
};

// Get bookings for a provider
export const getMyBookings = async () => {
  const token = localStorage.getItem("user_token");
  try {
    const response = await api.get("/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data.bookings || response.data.data || [],
    };
  } catch (error) {
    console.error("Booking fetch error:", error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch bookings",
    };
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  const token = localStorage.getItem("user_token");
  try {
    const response = await api.patch(`/${bookingId}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Status update error:", error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update status",
    };
  }
};