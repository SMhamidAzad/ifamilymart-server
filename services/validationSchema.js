const { body } = require('express-validator');

exports.productInfoSchema = [
    body('brandName')
        .notEmpty().withMessage('Brand name is required')
        .isString().withMessage('Brand name must be a string')
        .isLength({ min: 3, max: 6 }).withMessage('Brand name must be at least 3 characters and not more than 6!'),
    body('unit')
        .notEmpty().withMessage('Unit is required')
        .matches(/^[a-zA-Z]+$/).withMessage('Unit must contain only alphabetic characters'),
    body('quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .notEmpty().withMessage('Date is required')
        .custom((value) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                throw new Error('Date must be in YYYY-MM-DD format');
            }
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error('Date must be a valid date');
            }
            return true;
        }),
];