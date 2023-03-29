'use strict';
import express from 'express';
import getInbox from '../controller/inboxController.js';
import { checkLogin } from '../middleware/commons/checkLogin.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
const router = express.Router();
router.get('/', decoratorHtmlResponse('Inbox'), checkLogin, getInbox);

export default router;
