import jwt from 'jsonwebtoken';
import Hotel from '../models/Hotel.js';

const hotelAuthenticate = async(req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth Token: ', token);


    if(!token){
        console.log('Access Denied');
        return res.status(401).json({
            message: 'Access denied. No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded: ', decoded);
        req.hotel = await Hotel.findById(decoded.id)

        if(!req.hotel){
            console.log('Hotel not found');
            return res.status(404).json({
                message: 'Hotel not Found',
            })
        }

        next();
    } catch (error) {
        console.log('Invalid Token');
        console.error(error.message);
        return res.status(400).json({
            message: 'Invalid Token',
            
        })
    }
}

export default hotelAuthenticate
