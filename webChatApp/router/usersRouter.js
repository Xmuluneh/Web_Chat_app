'use strict';
import express from 'express';
import getUsers from '../controller/usersController.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
import avatarUpload from '../middleware/users/avatarsUpload.js';
const router = express.Router();
router.get('/', decoratorHtmlResponse('Users'), getUsers);

// add user
router.post('/', avatarUpload);

export default router;
