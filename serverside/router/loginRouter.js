import express from 'express';
import getLogin from '../controller/loginController';
const router = express.Router();
import decoratorHtmlResponse from '../middleware/commons/decoratorHtmlResponse';
//login page

router.get('/', decoratorHtmlResponse('Login', getLogin));

export default router;
