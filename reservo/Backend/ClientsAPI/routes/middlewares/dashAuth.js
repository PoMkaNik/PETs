const express = require('express');

const app = express();

const config = require('../../config'); // get our config file

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

app.set('superSecret', config.dashSecret); // secret variable

const User = require('../../models/user'); // get our mongoose model

const bcrypt = require('bcrypt'); // password hashing

// route to authenticate user and provide a token
module.exports.authenticateUser = (req, res) => {
  // find the user
  User.findOne({ name: req.body.name }).populate('client').exec((err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(403).json({
        success: false,
        message: 'Authentication failed. User not found.',
      });
    } else if (user) {
      // check if password matches
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result === false) {
          res.status(403).json({
            success: false,
            message: 'Authentication failed. Wrong password.',
          });
        } else if (result === true) {
          // if user is found and password is right
          // create a token
          const token = jwt.sign({
            uuid: user.uuid,
            name: user.name,
            clientName: user.client.name,
            clientUuid: user.client.uuid,
          }, app.get('superSecret'), {
            expiresIn: 60 * 60 * 24, // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            token,
          });
        }
      });
    }
  });
};

// route middleware to verify a token
module.exports.ensureUserAuthenticated = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      }
      // if everything is good, save to request for use in other routes
      /* eslint-disable no-param-reassign */ // CHANGES: ESLint
      req.decoded = decoded;

      next();
    });
  } else {
    // if there is no token
    // return an error
    res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
