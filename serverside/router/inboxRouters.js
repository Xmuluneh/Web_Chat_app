import express from 'express';
import getInbox from '../controller/inboxController';
const router = express.Router();
//inbox page

router.get('/', getInbox);

export default router;
