import bcrypt from 'bcrypt';
import path from 'path';
import User from '../models/peoples.js';
import { unlink } from 'fs';
// get user from Db
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render('users', {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}
// add user to db
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: 'User is added',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unknown Error Occurred',
        },
      },
    });
  }
}
async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    /// revmoe user avater
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: 'User removed successfully',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Could not delete the user',
        },
      },
    });
  }
}
export { getUsers, addUser, removeUser };
