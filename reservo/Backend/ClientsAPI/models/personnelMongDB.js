// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const personnelSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false },
  phone: { type: String, required: false },
  nickname: { type: String, required: false },
  password: { type: String, required: true },
  position: { type: String, required: true },
  manager: { type: Boolean }, // FIXME: do we need it if we have position field
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  status: { type: String,
    required: true,
    enum: ['new', // when created
      'demo', // for demo clients
      'billing', // for billing clients
      'paused', // for clients after demo or not paid in time
      'archive', // for closed clients
    ] },
}, { collection: 'personnel' });

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;
