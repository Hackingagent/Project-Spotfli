import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const userAuthenticate = async(req, res, next) => {
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
        req.user = await User.findById(decoded.id)

        if(!req.user){
            console.log('User not found');
            return res.status(404).json({
                message: 'User not Found',
            })
        }

        next();
    } catch (error) {
        console.log('Invalid Token')
        return res.status(400).json({
            message: 'Invalid Token',
        })
    }
}

export default userAuthenticate
