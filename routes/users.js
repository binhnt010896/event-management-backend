const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerUser, getAllUsers } = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');
// Import Models
const User = require('../models/User');

// Validation middleware
const validateRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error('Email is already in use');
      }
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// POST /users/register - Register a new user
router.post('/register', validateRegistration, registerUser);

// GET /users - Fetch all users
router.get('/', authenticateJWT, getAllUsers);


module.exports = router;
