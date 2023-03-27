'use strict';
import express from 'express';
import getUsers from '../controller/usersController.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
const router = express.Router();
router.get('/', decoratorHtmlResponse('Users'), getUsers);

export default router;
