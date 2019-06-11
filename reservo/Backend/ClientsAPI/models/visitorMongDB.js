// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const visitorSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String, required: true },
  visits: { type: Number }, // to count number of visits
  status: { type: String }, // to have loyalty or other type status
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
