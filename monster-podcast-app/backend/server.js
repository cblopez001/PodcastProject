const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Initialize express application
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Import routes
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoute');// Ensure this file exists
const episodeRoutes = require('./routes/episodeRoute');
const youtubeRoutes = require('./routes/youtubeRoute');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/MonsterMashDatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Use routes
app.use('/api/episodes', episodeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', newsletterRoutes);;
app.use('/api/youtube', youtubeRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Handle SPA - Send index.html for any unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
