'use strict';
import express from 'express';
import { getUsers } from '../controller/usersController.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
import avatarUpload from '../middleware/users/avatarsUpload.js';
import {
  addValidators,
  addUserValidationHandler,
} from '../middleware/users/userValidators.js';
const router = express.Router();
router.get('/', decoratorHtmlResponse('Users'), getUsers);

// add user
router.post('/', avatarUpload, addValidators, addUserValidationHandler);

export default router;
