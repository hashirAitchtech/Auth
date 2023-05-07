const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const corsOptions = require('./config/corsOptions');

const {swaggerJSDocOptions, swaggerUIOptions} = require('./config/swaggerConfig');

const usersRouter = require('./routes/users');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/users', usersRouter);

const specs = swaggerJsDoc(swaggerJSDocOptions);

// swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, swaggerUIOptions));

// API definitions (JSON)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

app.use(globalErrorHandler);

module.exports = app;