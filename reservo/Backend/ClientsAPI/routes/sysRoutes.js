// SYS ROUTES =====================

const express = require('express');

const User = require('../models/user');

const Client = require('../models/client');

const Team = require('../models/team');

const sysAuth = require('./middlewares/sysAuth');

const sysHandler = require('./handlers/sysHandler');

// get an instance of the router for SYS routes
const sysRoutes = express.Router();

// == not restricted routes ==
// setup route
sysRoutes.get('/setup', sysHandler.createSetupEnvironment);

// route to authenticate a user (POST http://localhost:3030/sys/authenticate)
sysRoutes.post('/authenticate', sysAuth.authenticateUser);

// == restricted routes ==
// route to return all users (GET http://localhost:3030/sys/users)
sysRoutes.get('/users', sysAuth.ensureUserAuthenticated, (req, res) => {
  if (!res) {
    User.find({}, (err, users) => {
      res.json(users);
    });
  }
});

// route to return all clients (GET http://localhost:3030/sys/clients)
sysRoutes.get('/clients', sysAuth.ensureUserAuthenticated, (req, res) => {
  if (!res) {
    Client.find({}, (err, clients) => {
      res.json(clients);
    });
  }
});

// route to return all team members (GET http://localhost:3030/sys/team)
sysRoutes.get('/team', sysAuth.ensureUserAuthenticated, (req, res) => {
  if (!res) {
    Team.find({}, (err, teamMembers) => {
      res.json(teamMembers);
    });
  }
});

module.exports = sysRoutes;
