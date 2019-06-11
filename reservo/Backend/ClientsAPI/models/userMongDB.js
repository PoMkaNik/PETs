// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const shortid = require('shortid');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const userSchema = new Schema({
  uuid: { type: String, unique: true, default: shortid.generate },
  name: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
