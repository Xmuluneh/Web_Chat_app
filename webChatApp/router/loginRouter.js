'use strict';
import express from 'express';
import { getLogin, logout, login } from '../controller/loginController.js';
import { redirectLoggedIn } from '../middleware/commons/checkLogin.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
import {
  doLoginValidationHandler,
  doLoginValidators,
} from '../middleware/login/loginValidators.js';
const router = express.Router();
const page_title = 'Login';
router.get('/', decoratorHtmlResponse(page_title), redirectLoggedIn, getLogin);

router.post(
  '/',
  decoratorHtmlResponse(page_title),
  login,
  doLoginValidators,
  doLoginValidationHandler
);
router.delete('/', logout);

export default router;
