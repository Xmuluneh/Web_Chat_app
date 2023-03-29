import { check, validationResult } from 'express-validator';

const doLoginValidators = [
  check('username')
    .isLength({
      min: 2,
    })
    .withMessage('Mobile number or email is required'),
  check('password').isLength({ min: 2 }).withMessage('password is required'),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

export { doLoginValidators, doLoginValidationHandler };
