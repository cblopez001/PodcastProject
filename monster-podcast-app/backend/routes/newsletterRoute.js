const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// Define route for subscribing to the newsletter
router.post('/subscribe', newsletterController.subscribe);

module.exports = router;
