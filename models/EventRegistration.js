const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const EventRegistration = sequelize.define('EventRegistration', {
  qrKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = EventRegistration;
