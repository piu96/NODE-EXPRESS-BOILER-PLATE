const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envValidation = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        APP_PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().default('localhost'),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.when('NODE_ENV', {
            is: 'production',
            then: Joi.string().min(1).required(),
            otherwise: Joi.string().allow('').optional()
        }),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description('Minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description('Days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('Minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('Minutes after which verify email token expires'),
        LOG_FOLDER: Joi.string().required(),
        LOG_FILE: Joi.string().required(),
        LOG_LEVEL: Joi.string()
            .valid('debug', 'info', 'warn', 'error')
            .default('info'),
        REDIS_HOST: Joi.string().default('127.0.0.1'),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_USE_PASSWORD: Joi.string().valid('yes', 'no').default('no'),
        REDIS_PASSWORD: Joi.when('REDIS_USE_PASSWORD', {
            is: 'yes',
            then: Joi.string().required(),
            otherwise: Joi.string().optional()
        })
    })
    .unknown();

const { value: envVar, error } = envValidation
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    nodeEnv: envVar.NODE_ENV,
    port: envVar.APP_PORT,
    dbHost: envVar.DB_HOST,
    dbUser: envVar.DB_USER,
    dbPass: envVar.DB_PASS,
    dbName: envVar.DB_NAME,
    dbPort: envVar.DB_PORT,
    jwt: {
        secret: envVar.JWT_SECRET,
        accessExpirationMinutes: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVar.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVar.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVar.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    logConfig: {
        logFolder: envVar.LOG_FOLDER,
        logFile: envVar.LOG_FILE,
        logLevel: envVar.LOG_LEVEL,
    },
    redis: {
        host: envVar.REDIS_HOST,
        port: envVar.REDIS_PORT,
        usePassword: envVar.REDIS_USE_PASSWORD,
        password: envVar.REDIS_PASSWORD,
    },
};
