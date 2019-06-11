// const mongoose = require('mongoose');

const graffitiMongoose = require('@risingstack/graffiti-mongoose');

const UserQL = require('./userQL');

const PetQL = require('./petQL');

// const config = require('../config'); // get our config file

// mongoose.Promise = global.Promise;
// mongoose.connect(config.database); // connect to database

module.exports = graffitiMongoose.getSchema([PetQL, UserQL]);
