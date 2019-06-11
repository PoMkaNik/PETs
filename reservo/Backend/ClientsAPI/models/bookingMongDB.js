// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const bookingSchema = new Schema({
  status: { type: String,
    required: true,
    enum: ['new', // when created (received)
      'processed', // when there was free table on required seats num
      'waitinglist', // when no free tables and agreed to be added to waiting list
      'canceled', // when no free tables and refuse to be in waiting list
      'onplace', // when visitor(s) came to the place
      'archive', // when visitor(s) leave the place
    ] },
  time: { type: String, required: true },
  date: { type: String, required: true },
  sets: { type: String, required: true },
  visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
