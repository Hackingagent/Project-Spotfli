import UserService from "../../../models/pivots/UserService.model.js";

//create new Service
export const createService = async (req, res) => {
  try {
    
    const gig = new UserService({
      ...req.body,
      user: req.user.id,
    });
    await gig.save();
    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
