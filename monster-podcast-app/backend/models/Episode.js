// models/episodeModel.js
const mongoose = require('mongoose');

// Define the Episode schema
const episodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
  audioSrc: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Create the Episode model
const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
