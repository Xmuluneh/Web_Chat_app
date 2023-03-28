import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/peoples.js';
// 404 page not found
function notFoundHandler(req, res, next) {
  next(createError(404, 'Page not found'));
}

function getLogin(req, res, next) {
  res.render('index');
}

async function login(req, res, next) {
  try {
    // find a user who has this email / mobile
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: 'user',
        };

        // Generate Token

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // SET Cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = userObject;
        res.render('inbox');
      } else {
        throw createError('Login Failed please try again');
      }
    } else {
      throw createError('Login Failed please try again');
    }
  } catch (err) {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send('Logged Out User');
}

export { getLogin, logout, login };
