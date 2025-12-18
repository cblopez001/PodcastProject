// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/home.css'; // Import the CSS file for the footer

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/episodes">Episodes</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
        </div>
        <div className="footer-copyright">
          <p>Copyright &copy; 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
