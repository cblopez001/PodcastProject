// routes/episodeRoutes.js
const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

// Route to get all episodes
router.get('/', episodeController.getEpisodes);

// Route to add a new episode (optional)
router.post('/', episodeController.createEpisode);

// Add more routes as needed

module.exports = router;