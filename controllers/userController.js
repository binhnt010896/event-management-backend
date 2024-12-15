const User = require('../models/User'); // Import the User model
const { validationResult } = require('express-validator'); 

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } }); // Exclude passwords for security
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: {users}
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.registerUser = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Return the created user (exclude sensitive fields like password)
    const { id, profile_picture, createdAt, updatedAt } = newUser;
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id, name, email, profile_picture, createdAt, updatedAt },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};