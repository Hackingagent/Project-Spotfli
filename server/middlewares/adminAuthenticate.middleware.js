import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

const adminAuthenticate = async(req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        console.log('Access Denied');
        return res.status(401).json({
            message: 'Access denied. No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id)

        if(!req.admin){
            console.log('Admin not found');
            return res.status(404).json({
                message: 'Admin not Found',
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

export default adminAuthenticate
