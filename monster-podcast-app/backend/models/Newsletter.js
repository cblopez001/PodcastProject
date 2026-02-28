const mongoose = require('mongoose');

// Define the schema for the newsletter subscription
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
}, {
  timestamps: true
});

// Create a model from the schema
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;
