const shortid = require('shortid'); // id generator

const personalSchemas = {
  // individual schema to be created for each Client
  // sintaxis -> collectionNamePostfix: { modelSchemaObject in mongoose style } 
  staff: {
    uuid: { type: String, unique: true, default: shortid.generate },
    name: { type: String, required: true },
    pass: { type: String, required: true },
    position: { type: String, required: true },
  },

  table: {
    uuid: { type: String, unique: true, default: shortid.generate },
    zone: { type: String },
    number: { type: String, required: true },
    seats: { type: String, required: true },
    smoking: { type: Boolean },
  },
};

// as result - Object with DBs to create in each key-value pair
const result = {};

Object.keys(personalSchemas).forEach((key) => {
  result[key] = personalSchemas[key];
});

module.exports = result;
