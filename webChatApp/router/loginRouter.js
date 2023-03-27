'use strict';
import express from 'express';
import getLogin from '../controller/loginController.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
const router = express.Router();
router.get('/', decoratorHtmlResponse('Login'), getLogin);

export default router;
