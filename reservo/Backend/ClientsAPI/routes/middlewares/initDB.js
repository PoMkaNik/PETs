// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// require file with all schemas to create
// add schemas in this file to create new collection for each Client
const schemas = require('../../models/clientsPersSchemas');

// set up a mongoose model and pass it using module.exports
function createNewPersonalModel(clientID, collectionNamePostfix, modelSchemaObject) {
  // conn defined in server js as global const
  /* eslint-disable no-undef */ // CHANGES: ESLint
  conn.db.collection(`${clientID}${collectionNamePostfix}`, (err, collect) => {
    if (!collect) {
      const newSchema = new Schema(modelSchemaObject, { collection: `${clientID}${collectionNamePostfix}` });

      return mongoose.model(`${clientID}${collectionNamePostfix}`, newSchema);
    }

    return mongoose.model(`${clientID}${collectionNamePostfix}`);
  });
}

// function to initializate personal models for each Client
function initClientsPersDBs(req, res, next) {
  const clientID = req.decoded.clientUuid;

  /* eslint-disable no-param-reassign */ // CHANGES: ESLint
  req.persDB = {};

  Object.keys(schemas).forEach((key) => {
    if (key) {
      // creating or initializating Clients models
      createNewPersonalModel(clientID, key, schemas[key]);
      // createModel(clientID, collectionNamePostfix, modelSchemaObject) for creation of new model
      req.persDB[key] = mongoose.model(`${clientID}${key}`);
    }
  });

  next();
}

module.exports.initClientsDBs = initClientsPersDBs;
