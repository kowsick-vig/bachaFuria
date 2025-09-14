const express = require('express');
const morgan = require('morgan');

const classRouter = require('./routes/classRoutes');
const userRouter = require('./routes/userRoutes');

// const cors = require('cors')
// const {MongoClient} = require('mongodb')
// let db;
const app = express();

// Middlewares
// using environment variable to determine using certain middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // Middleware to access the req.body json file (body-parser)
// app.use(express.static(`${__dirname}/public`))
// app.use(cors())

app.use('/api/v1/tickets', classRouter);
app.use('/api/v1/users', userRouter);

// Error handling for undeclared URLs
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
