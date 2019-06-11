// SYS ROUTES =====================

const express = require('express');

const auth = require('./middlewares/auth');

const resolver = require('./handlers/resolver');

const seedDB = require('../seed');

// get an instance of the router for SYS routes
const qlRoutes = express.Router();

// == not restricted routes ==

qlRoutes.get('/seed', seedDB.seed);

// route to authenticate a user (POST http://localhost:3030/ql/authenticate)
qlRoutes.post('/authenticate', auth.authenticateUser);

// == restricted routes ==
// route to return all users (GET http://localhost:3030/sys/users)
qlRoutes.get('/clients', auth.ensureUserAuthenticated, resolver.listOfClients);

module.exports = qlRoutes;
