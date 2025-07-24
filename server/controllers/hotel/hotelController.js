import jwt from "jsonwebtoken";
const { JsonWebTokenError, sign, verify } = jwt;
import Hotel from "../../models/Hotel.model.js";
import Admin from "../../models/admin.model.js";

export const loginHotel = async (req, res) => {
    try{
        const {email, password} = req.body;

        //check if hotel exists
        const hotel = await Hotel.findOne({ email }).select('+password');

        if(!hotel){
            return res.status(401).json({message: 'Ivalid Credentials'});
        }

        // check password
        const isMatch = await hotel.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate token

        const hotel_token = jwt.sign(
            {id: hotel._id, role: 'hotel'},
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            success: true,
            hotel_token,
            hotel: await Hotel.findOne({ email }),
        });
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error during login'});
    }
};


export const registerHotel = async (req, res) => {
    try{
        const {hotelName, email, password, phone, address, city, description, amenities } = req.body;
        
        const addedBy = req.admin;  // Get admin ID from authenticated request
        //check if hotel with this email already exists
        const hotelExists = await Hotel.findOne({ email });
        if(hotelExists){
            return res.status(400).json({message: 'Hotel already Exists with the same email'});
        }

        const newHotel = await Hotel.create({
            hotelName,
            email,
            password,
            phone,
            address,
            city,
            description,
            amenities,
            addedBy
        });
        
        newHotel.save();

        res.status(201).json({
            success: true,
            data: newHotel
        });

    }catch(error){
        console.error('Hotel Registration error: ', error);
        res.status(500).json({
            message: error.message || 'Server error during registration'
        });
    }
};

export const getHotels = async (req, res) => {
    try{
        const hotels = await Hotel.find().select('-password').populate('addedBy', 'first_name');
        res.status(200).json({ success: true, data: hotels });
    }catch(error){
        console.log('Failed to get hotels', error);
        res.status(500).json({})
    }
}


// code to get current hoteluser (logged in hotel)

export const getCurrentHotel = async (req, res) =>{
    try{
        const hotel = await Hotel.findById(req.hotel._id).select('-password');
        res.status(200).json({success: true, data: hotel});
    }catch(error){
        console.error('Get current hotel error:', error);
        res.status(500).json({message: 'Server error'});
    }
};

