const config = require('../config/env.config'); // Adjusted path
module.exports = {
    development: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
    },
    test: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
};