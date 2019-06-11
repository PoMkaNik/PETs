// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const zoneSchema = new Schema({
  name: { type: String, required: true },
  smoking: { type: Boolean },
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
