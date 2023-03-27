import { check, validationResult } from 'express-validator';
import { unlink } from 'fs';
import createError from 'http-errors';
import path from 'path';
import User from '../../models/peoples.js';

//add validation for the user

const addValidators = [
  check('name')
    .isLength({ min: 1 })
    .isAlpha('en-US', { ignore: '-' })
    .withMessage('Name is required')
    .withMessage('Name is must be alphabet')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError('Email in use');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('mobile')
    .isMobilePhone('en-ZA', 'en-ZM', 'en-ET', {
      strictMode: true,
    })
    .withMessage('Mobile Number must be a valid  county code')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile Number in use');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage('Password must be eight characters long'),
];
const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // removed the file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public.uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(500).json({ errors: mappedErrors });
  }
};

export { addValidators, addUserValidationHandler };
