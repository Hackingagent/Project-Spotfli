import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const providerCheck = async(req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Auth Token: ', token);

  if(!token){
      console.log('Access Denied');
      return res.status(401).json({
          message: 'Access denied. No token provided'
      });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id)

  if (!req.user || !req.user.isApprovedProvider) {
    return res.status(403).json({ msg: 'Approved service provider access required' });
  }
  next();
};


export default providerCheck;
