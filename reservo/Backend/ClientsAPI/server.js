// get the packages we need ===========
const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const morgan = require('morgan');

const config = require('./config'); // get our config file

const app = express();

const routes = require('./routes');

// configuration =======
const port = process.env.PORT || 3030; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
global.conn = mongoose.connection;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// routes ================
// basic route
app.get('/', (req, res) => {
  res.send(`The RESERVO API is at http://localhost:${port}${config.api}`);
});

// API Routes =============
// apply the routes to our system app with the prefix /sys
app.use(config.sys, routes.sys);

// apply the routes to our dasboard app with the prefix /dash
app.use(config.dash, routes.dash);

// apply the routes to our RESERVO application with the prefix /api
// app.use(config.api, routes.api);

// start the server ======
app.listen(port);
/* eslint-disable no-console */ // CHANGES: ESLint
console.log(`Server started at http://localhost:${port}`);
