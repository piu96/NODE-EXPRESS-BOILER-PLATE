const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../DB/db.connection'); // Import your Sequelize instance

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures username is unique
      validate: {
        notEmpty: true, // Ensures it can't be an empty string
        len: [4, 20], // Username should be between 4 and 20 characters long
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures email is unique
      validate: {
        isEmail: true, // Ensures it's a valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures it can't be empty
        len: [6, 255], // Password length should be between 6 and 255 characters
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // Default role is 'user'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Set the default value to the current time
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Set the default value to the current time
    },
  },
  {
    sequelize, // Pass in the Sequelize instance
    modelName: 'User', // Define the model name
    tableName: 'users', // Define the table name (should match your table name)
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

// Export the model
module.exports = User;
