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

//routes
app.use('/api/user', userRouter);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to wise wallet' });
});
module.exports = app;
