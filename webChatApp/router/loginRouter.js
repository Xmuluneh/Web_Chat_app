'use strict';
import express from 'express';
import { getLogin, logout, login } from '../controller/loginController.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
const router = express.Router();
const page_title = 'Login';
router.get('/', decoratorHtmlResponse(page_title), getLogin);

router.post('/', decoratorHtmlResponse(page_title), login);

export default router;
