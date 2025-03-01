import { NextFunction, Request, Response } from 'express';
import { transactionRouter } from './routes/transaction';

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./routes/user');

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//request logger
app.use(morgan('dev'));

//securtiy http headers
app.use(helmet());

// Middleware per logging
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

//routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to wise wallet' });
});
app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter);
module.exports = app;
