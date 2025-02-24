// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        indexes:[
            {
                unique: true,
                fields: ['email']
            }
        ],
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'organizer', 'attendee'),
        allowNull: false,
        defaultValue: 'attendee',
    },
    profile_picture: {
        type: DataTypes.STRING,
    },
});

module.exports = User;