// CommunityPage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/community.css'; // Import the CSS file for this page
import Footer from '../components/Footer'; // Import the Footer component
import Navbar from '../components/Navbar'; // Import the Navbar component

const CommunityPage = () => {
  return (
    <div className="community-page">

      {/* Discord Section */}
      <div className="community-section discord-section">
        <h2>Join Our Community on Discord</h2>
        <p>Connect with other listeners, discuss episodes, and get exclusive behind-the-scenes content by joining our Discord server!</p>
        <a
          href="https://discord.gg/your-discord-link" // Replace with your Discord server link
          target="_blank"
          rel="noopener noreferrer"
          className="discord-button"
        >
          <i className="fab fa-discord icon"></i> Join Our Discord
        </a>
      </div>

      {/* Social Media Section */}
      <div className="community-section social-media-section">
        <h2>Follow Us on Social Media</h2>
        <p>Stay up to date with the latest podcast news, highlights, and more by following us on social media!</p>
        <div className="social-buttons">
          <a
            href="https://instagram.com/your-instagram" // Replace with your Instagram link
            target="_blank"
            rel="noopener noreferrer"
            className="social-button instagram"
          >
            <i className="fab fa-instagram icon"></i> Instagram
          </a>
          <a
            href="https://facebook.com/your-facebook" // Replace with your Facebook link
            target="_blank"
            rel="noopener noreferrer"
            className="social-button facebook"
          >
            <i className="fab fa-facebook icon"></i> Facebook
          </a>
          <a
            href="https://youtube.com/your-youtube" // Replace with your YouTube link
            target="_blank"
            rel="noopener noreferrer"
            className="social-button youtube"
          >
            <i className="fab fa-youtube icon"></i> YouTube
          </a>
        </div>
      </div>

    </div>
  );
};

export default CommunityPage;
