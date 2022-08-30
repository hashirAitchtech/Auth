const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = require('./config/corsOptions');

const usersRouter = require('./routes/users')

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/users', usersRouter);

app.use(globalErrorHandler);

function globalErrorHandler(err, req, res, next){

    res.status(400).json({
        status: 'failed',
        error: err
    })

//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
    
//   if (process.env.NODE_ENV === 'development') {
//     sendErrorDev(err, res);
//   }else if(process.env.NODE_ENV === 'production'){
//   	let error = { ...err };

//     if (error.name === 'CastError') error = handleCastErrorDB(error);
//     if (error.code === 11000) error = handleDuplicateFieldsDB(error);
//     if (error.name === 'ValidationError')
//       error = handleValidationErrorDB(error);
//     if (error.name === 'JsonWebTokenError') error = handleJWTError();
//     if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

//     sendErrorProd(error, res);
  }

module.exports = app;