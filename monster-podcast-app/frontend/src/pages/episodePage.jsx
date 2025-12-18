import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/styles/episode.css';

const EpisodePage = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/episodes', {
          params: { filter, search: searchQuery },
        });
        setEpisodes(response.data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };
    fetchEpisodes();
  }, [filter, searchQuery]);

  return (
    <div>

      <div className="accent-div"></div>

      <div className="filter-container">
        <ul className="filter-wrapper">
          <li className="filter-item">
            <a href="#" className="filter-link" onClick={() => setFilter('All')}>All</a>
          </li>
          <li className="filter-item">
            <a href="#" className="filter-link" onClick={() => setFilter('Movies')}>Movies</a>
          </li>
          <li className="filter-item">
            <a href="#" className="filter-link" onClick={() => setFilter('Games')}>Games</a>
          </li>
          <li className="filter-item">
            <a href="#" className="filter-link" onClick={() => setFilter('Books')}>Books</a>
          </li>
          <li className="filter-item">
            <a href="#" className="filter-link" onClick={() => setFilter('Comics')}>Comics</a>
          </li>
        </ul>

        <div className="search">
          <form action="#">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="library-container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {episodes.map((episode, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <a href="#">
                  <img src={episode.imgSrc} className="card-img-top" alt={episode.title} style={{ width: '100%', height: '800px' }} />
                </a>
                <div className="card-body">
                  <h5 className="card-title">{episode.title}</h5>
                  <p className="card-text">{episode.description}</p>
                  <audio src={episode.audioSrc} controls>Listen to episode</audio>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="accent-div"></div>
      <Footer />
    </div>
  );
};

export default EpisodePage;
