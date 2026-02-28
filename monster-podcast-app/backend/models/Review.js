const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  firstInitial: { type: String, required: true },
  lastName: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Ensure rating is between 1 and 5
});

module.exports = mongoose.model('Review', reviewSchema);
