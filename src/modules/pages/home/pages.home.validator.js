const { check, validationResult } = require('express-validator');

// Validation rules for fetching page by slug
const validatePageRequest = [
    check('slug')
        .trim().
         optional().notEmpty().withMessage('Slug is required')
        .isString().withMessage('Slug must be a string')
        .matches(/^[a-zA-Z0-9-_]+$/).withMessage('Invalid slug format')
];

module.exports = { validatePageRequest };
