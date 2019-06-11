// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const shortid = require('shortid');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const teamSchema = new Schema({
  uuid: { type: String, unique: true, default: shortid.generate },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
