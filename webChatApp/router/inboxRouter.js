'use strict';
import express from 'express';
import getInbox from '../controller/inboxController.js';
import decoratorHtmlResponse from '../middleware/commons/decorateHtmlResponse.js';
const router = express.Router();
router.get('/', decoratorHtmlResponse('Inbox'), getInbox);

export default router;
