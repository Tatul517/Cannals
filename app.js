import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import dbConnect from  "./dbConnect/dbConnect.js";
import dotenv from "dotenv";
// import './schedule/schedule.js'

dotenv.config()

import indexRouter from './routes/userPackages.js';
import usersRouter from './routes/users.js';
import channelsRouter from './routes/channels.js'

const app = express();
dbConnect()
const filePath =  path.resolve() + '/uploads';


app.use('/uploads', express.static(filePath))

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/channels', channelsRouter);

export default app;
