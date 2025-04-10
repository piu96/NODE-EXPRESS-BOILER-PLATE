const { Sequelize } = require('sequelize');
const config = require('./db.config');  

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false,
  dialectOptions: dbConfig.dialectOptions || {},
  pool: {
    max: 5,         
    min: 0,         
    acquire: 30000, 
    idle: 10000     
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(` Database connected successfully! (Environment: ${environment})`);
    require('../models/user.model');
  } catch (error) {
    console.error(' Unable to connect to the database:', error.message);
  }
};


connectDB(); 

module.exports = sequelize;
