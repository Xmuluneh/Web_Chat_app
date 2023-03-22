import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import http from 'http';
// Internal import
import {
  notFoundHandler,
  errorHandler,
} from './middleware/commons/errorHandler.js';
import loginRouter from './router/loginRouter';
import usersRouter from './router/usersRouter';
import inboxRouters from './router/inboxRouters';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

process.env.APP_Name;

// Database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DataBase connected successfully');
  })
  .catch((err) => console.log(err));

// request parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine

app.set('view engine', 'ejs');

// set static folder

app.use(express.static(path.join(__dirname, 'public')));

// parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouters);
// common error Handler
app.use(errorHandler);

// 404 not found handler
app.use(notFoundHandler);

app.listen(process.env.PORT, () => {
  console.log(`App listening to port: ${process.env.PORT}`);
});
