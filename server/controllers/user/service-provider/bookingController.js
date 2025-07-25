import UserService from "../../../models/pivots/UserService.model.js";

//Book a service (for client)
export const createBooking = async (req, res) => {
  try {
    const gig = await UserService.findById(req.body.gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    const booking = new booking({
      gigId: gig._id,
      clientId: req.user._id,
      providerId: gig.createdBy,
      ...res.body,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get all booking for a provider
export const getProviderBookings = async (req, res) => {
  try {
    const bookings = await UserService.find({ providerId: req.user.id })
      .populate("clientId", "email name")
      .populate("gigId", "title price");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Get all booking for a client
export const getClientBookings = async (req, res) => {
  try {
    const bookings = await UserService.find({ providerId: req.user.id })
      .populate("providerId", "email name")
      .populate("gigId", "title price");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Udpate booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await UserService.findOneAndUpdate(      { 
        _id: req.params.id,
        $or: [
          { providerId: req.user.id },
          { role: 'admin' }
        ]
      },
      { status: req.body.status },
      { new: true }
    );
      if (!booking) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
      }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
