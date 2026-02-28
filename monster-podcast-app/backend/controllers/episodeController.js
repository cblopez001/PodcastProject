// controllers/episodeController.js
const Episode = require('../models/Episode');

exports.getEpisodes = async (req, res) => {
  try {
    const { filter, search } = req.query;
    const query = {};

    if (filter && filter !== 'All') {
      query.category = filter;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const episodes = await Episode.find(query);
    res.json(episodes);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEpisode = async (req, res) => {
  try {
    const newEpisode = new Episode(req.body);
    await newEpisode.save();
    res.status(201).json(newEpisode);
  } catch (error) {
    console.error('Error creating episode:', error);
    res.status(500).json({ message: 'Server error' });
  }
};