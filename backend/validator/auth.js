const { check } = require('express-validator');

exports.userSignupValidator = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('must be valid email address'),
  check('password').isLength({min: 6})
    .withMessage('password must be longer 6'),
];

exports.userSignInValidator = [
  check('email').isEmail().withMessage('must be valid email address'),
  check('password').isLength({min: 6})
    .withMessage('password must be longer 6'),
];