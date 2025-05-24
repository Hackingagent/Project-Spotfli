// routes/userRoutes.js
import express from 'express';
import { body } from 'express-validator';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Validation middleware directly in routes
router.post('/register', 
  [
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Must be at least 3 characters'),
      
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email')
      .normalizeEmail(),
      
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Must be at least 6 characters')
  ],
  registerUser
);

export default router;