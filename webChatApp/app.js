import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/commons/errorHandler.js';
import loginRouter from './router/loginRouter.js';
import usersRouter from './router/usersRouter.js';
import inboxRouter from './router/inboxRouter.js';
/*
import favicon from 'serve-favicon';
import logger from 'morgan';

import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import routes from './routes/index';
import config from './config/environment';
*/
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//process.env.APP_Name

//DataBase connection

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DataBase connection is successful'))
  .catch((err) => console.log(err));

// request parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine

app.set('view engine', 'ejs');

// set the  static folder

app.use(express.static(path.join(__dirname, 'public')));

// parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));

/// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);
/// 404 error handler
app.use(notFoundHandler);

// common error handling
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`App listing to PORT:${process.env.PORT}`);
});
console.log('End of the server ');
