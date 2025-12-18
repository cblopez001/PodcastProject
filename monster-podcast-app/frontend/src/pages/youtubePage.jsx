import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/styles/youtube.css';

const YouTubePlayer = ({ videoId }) => {
  return (
    <div className="youtube-container">
      <iframe
        width="100%"
        height="450px"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const YouTubePage = () => {
  const [latestVideoId, setLatestVideoId] = useState('');
  console.log(import.meta.env.VITE_SERVER_BASE_URL);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the latest video from the backend
    const fetchLatestVideo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/youtube/latest`);
        const data = await response.json();

        console.log('Latest Video Data:', data); // Debugging line

        if (response.ok && data.id) {
          setLatestVideoId(data.id); // Set the latest video ID
        } else {
          setError('No latest video found or invalid response');
          console.error('No latest video found or invalid response:', data);
        }
      } catch (error) {
        setError('Error fetching latest video');
        console.error('Error fetching latest video:', error);
      }
    };

    // Fetch the uploaded videos from the backend
    const fetchUploadedVideos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/youtube/uploads`);
        const data = await response.json();

        console.log('Uploaded Videos Data:', data); // Debugging line

        if (response.ok && data.length > 0) {
          setUploadedVideos(data); // Set the list of uploaded videos
        } else {
          setError('No videos found or invalid response');
          console.error('No videos found or invalid response:', data);
        }
      } catch (error) {
        setError('Error fetching uploaded videos');
        console.error('Error fetching uploaded videos:', error);
      }
    };

    fetchLatestVideo();
    fetchUploadedVideos();
  }, []);

  return (
    <div className="page-wrapper">
 
      <main className="youtube-page-container">
        <h1>Latest Show</h1>
        {latestVideoId ? (
          <YouTubePlayer videoId={latestVideoId} />
        ) : (
          <p>Loading the latest video...</p>
        )}

        <section className="videos-section">
          <h2>Previously Uploaded Shows</h2>
          <div className="videos-carousel">
            {uploadedVideos.map((video) => (
              <div key={video.id.videoId} className="video-card">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="video-thumbnail"
                  />
                  <h3>{video.snippet.title}</h3>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="accent-div"></div>
      <Footer />
    </div>
  );
};

export default YouTubePage;