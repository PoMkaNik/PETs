// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const placeSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: false },
  address: { type: String, required: false },
  personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' }],
  zones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }],
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' }],
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
