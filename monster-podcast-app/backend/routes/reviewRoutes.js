const express = require('express');
const { getReviews, submitReview } = require('../controllers/reviewController');
const router = express.Router();

router.get('/', getReviews); // Route to get all reviews
router.post('/', submitReview); // Route to submit a new review

module.exports = router;
