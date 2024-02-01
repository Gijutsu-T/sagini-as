// MissingPerson.js

const mongoose = require('mongoose');

const missingPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true }, // Added gender field
  height: { type: Number, required: true }, // Added height field
  description: String,
  lastSeenLocation: String,
  // Add other fields as needed
});

module.exports = mongoose.model('MissingPerson', missingPersonSchema);
