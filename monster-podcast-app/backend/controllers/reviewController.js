const Review = require('../models/Review');

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// Submit a new review
exports.submitReview = async (req, res) => {
  try {
    const { firstInitial, lastName, review, rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newReview = new Review({ firstInitial, lastName, review, rating });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview); // Respond with the new review
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Failed to submit review' });
  }
};
