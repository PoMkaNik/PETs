// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const tableSchema = new Schema({
  number: { type: String, required: true },
  seats: { type: String, required: true },
  smoking: { type: Boolean, required: true },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
