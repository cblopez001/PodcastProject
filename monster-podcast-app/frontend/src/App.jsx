// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homePage.jsx';
import AboutPage from './pages/aboutPage.jsx';
import ContactPage from './pages/contactPage.jsx';
import EpisodePage from './pages/episodePage.jsx';
import YouTubePage from './pages/youtubePage.jsx';
import CommunityPage from './pages/communitypage.jsx'; // Import the CommunityPage component
import Navbar from './components/Navbar'; // Assuming you have a Navbar component

function App() {
  return (
    <div>
      <Navbar /> {/* Added Navbar to include consistent navigation across all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/episodes" element={<EpisodePage />} />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/community" element={<CommunityPage />} /> {/* Added route for CommunityPage */}
      </Routes>
    </div>
  );
}

export default App;