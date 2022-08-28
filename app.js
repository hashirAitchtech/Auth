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

module.exports = app;