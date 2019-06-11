// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const clientSchema = new Schema({
  name: { type: String, required: true },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' }],
  status: { type: String,
    required: true,
    enum: ['new', // when created
      'demo', // for demo clients
      'billing', // for billing clients
      'paused', // for clients after demo or not paid in time
      'archive', // for closed clients
    ] },
  demodate: { type: Date },
  billingdate: { type: Date },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
