const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
