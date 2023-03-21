import express from 'express';
import getLogin from '../controller/loginController';
const router = express.Router();
//login page

router.get('/', getLogin);

export default router;
