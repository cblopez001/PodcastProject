const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/latest', async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    console.log ('You hit me');
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        channelId: channelId,
        order: 'date',
        part: 'snippet',
        type: 'video',
        maxResults: 1,
      },
    });

    if (response.status === 200 && response.data.items.length > 0) {
      const latestVideo = response.data.items[0];
      res.json({
        id: latestVideo.id.videoId,
        title: latestVideo.snippet.title,
        thumbnail: latestVideo.snippet.thumbnails.medium.url,
      });
    } else if (response.data.items.length === 0) {
      res.status(404).json({ message: 'No videos found' });
    } else {
      res.status(response.status).json({ message: 'Error fetching videos' });
    }
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside the 2xx range
      console.error('Error fetching latest video:', error.response.data);
      res.status(error.response.status).json({ message: error.response.data.error.message });
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      res.status(500).json({ message: 'No response received from YouTube API' });
    } else {
      // Something else happened in making the request
      console.error('Error setting up the request:', error.message);
      res.status(500).json({ message: 'Failed to fetch latest video' });
    }
  }
});

router.get('/uploads', async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        channelId: channelId,
        order: 'date',
        part: 'snippet',
        type: 'video',
        maxResults: 10,
      },
    });

    if (response.status === 200) {
      res.json(response.data.items);
    } else {
      res.status(response.status).json({ message: 'Error fetching videos' });
    }
  } catch (error) {
    if (error.response) {
      console.error('Error fetching uploaded videos:', error.response.data);
      res.status(error.response.status).json({ message: error.response.data.error.message });
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ message: 'No response received from YouTube API' });
    } else {
      console.error('Error setting up the request:', error.message);
      res.status(500).json({ message: 'Failed to fetch uploaded videos' });
    }
  }
});

module.exports = router;