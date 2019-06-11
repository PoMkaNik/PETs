// DASH ROUTES =====================

const express = require('express');

const initDB = require('./middlewares/initDB');

const dashAuth = require('./middlewares/dashAuth');

const sysHandler = require('./handlers/sysHandler');

const dashHandler = require('./handlers/dashHandler');

// get an instance of the router for DASH routes
const dashRoutes = express.Router();

// === UNrestricted routes ==
// route to register Clients and create admin user for Client
dashRoutes.post('/registration', sysHandler.createClientAndAdminUser);

// route to authenticate a user (POST http://localhost:3030/api/authenticate)
dashRoutes.post('/authenticate', dashAuth.authenticateUser);

// === restricted routes ==
// route to show a random message (GET http://localhost:3030/api/)
dashRoutes.get('/', dashAuth.ensureUserAuthenticated, initDB.initClientsDBs, (req, res) => {
  if (!res) {
    res.json({
      message: 'Welcome to the DASHBOARD API!',
      tokenDetails: req.decoded,
    });
  }
});

// show all personnel for the Client
dashRoutes.get('/personnel', dashAuth.ensureUserAuthenticated, initDB.initClientsDBs, dashHandler.showListOfStaff);

module.exports = dashRoutes;
