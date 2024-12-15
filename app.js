const express = require('express');
const sequelize = require('./config/db.config');

// Import Models
const User = require('./models/User');

const app = express();
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Sync models
    await sequelize.sync({ alter: true }); // Use `force: true` to drop existing tables
    console.log('Database synced.');

    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);