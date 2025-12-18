import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/home.css'; // Import the CSS file for this page
import Footer from '../components/Footer'; // Import the Footer component
import Navbar from '../components/Navbar';

/* Import Font Awesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

/* Import images */
import episodeUpdateDemo from '../assets/images/landingPageImages/episodeUpdateDemo.png';
import merchCarouselImage from '../assets/images/landingPageImages/merchCarouselImage.png';
import subscribeCarouselImage from '../assets/images/landingPageImages/subscribeCarouselImage.png';
import shopButtonImage from '../assets/images/landingPageImages/shopButtonImage.png';

const HomePage = () => {
  const [formData, setFormData] = useState({ firstInitial: '', lastName: '', review: '', rating: '' });
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch reviews from the database on component mount
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.log('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        setFormData({ firstInitial: '', lastName: '', review: '', rating: '' }); // Clear the form
        const updatedReview = await response.json();
        setReviews([...reviews, updatedReview]);
      } else {
        console.log('Error submitting review');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Subscription successful!');
        setEmail(''); // Clear the email field after successful submission
      } else {
        setMessage('Error subscribing. Please try again.');
      }
    } catch (error) {
      setMessage('Error subscribing. Please try again.');
    }
  };

  const ReviewsSection = ({ reviews }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const carouselRef = useRef(null);

    const toggleExpand = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    }; 

    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={index < rating ? 'text-warning' : 'text-muted'} // Use text-warning for filled stars and text-muted for empty stars
        />
      ));
    };

    const scrollCarousel = (direction) => {
      if (carouselRef.current) {
        const scrollAmount = direction === 'left' ? -300 : 300; // Adjust scroll amount as needed
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    return (
      <div className="reviews-container">
        <h2>Listener Reviews</h2>
        <div className="carousel-wrapper">
          <button className="carousel-control-btn" onClick={() => scrollCarousel('left')}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="review-carousel" ref={carouselRef}>
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <h4>{review.firstInitial} {review.lastName}</h4>
                <div className="rating-stars">{renderStars(review.rating)}</div>
                <p className={`review-text ${expandedIndex === index ? 'expanded' : 'collapsed'}`}>
                  {review.review}
                </p>
                <button className="toggle-btn" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? 'Show Less' : 'Read More'}
                </button>
              </div>
            ))}
          </div>
          <button className="carousel-control-btn" onClick={() => scrollCarousel('right')}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>

      {/* Accent Div */}
      <div className="carousel-accent-div"></div>

      {/* Main Carousel */}
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={merchCarouselImage} className="d-block w-100" alt="Merch Carousel" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={subscribeCarouselImage} className="d-block w-100" alt="Subscribe Carousel" />
          </div>
          <div className="carousel-item">
            <img src={episodeUpdateDemo} className="d-block w-100" alt="Episode Update Demo" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="carousel-accent-div"></div>
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to the Monster Mansion</h1>
        <p>Get ready to delve into the unknown as we explore the horrors that go bump in the night. Discover our collection of insightful reviews and engaging content from our horror movie review podcast. Prepare for a chilling journey into the depths of fear and fascination!</p>
      </section>

      {/* Live and Episode Buttons */}
      <div className="link-container">
        <ul>
          <li>
            <div className="panel-wrapper">
              <Link to="/episodes">
                <img src={shopButtonImage} className="panel-img" alt="Episode List" />
                <div className="overlay">
                  <h3 className="panel-text">Episode Library</h3>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="panel-wrapper">
              <Link to="/youtube">
                <img src={shopButtonImage} className="panel-img" alt="Live Show" />
                <div className="overlay">
                  <h3 className="panel-text">Latest Videos</h3>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>

      {/* Subscribe Section */}
      <div className="subscription-container">
      <div className="sub-email-container">
          <div className="email-message">
            <h1>NEWSLETTER</h1>
            <p>Never miss an episode. Sign up for our newsletter mailing list!</p>
          </div>
          <form className="email-form" onSubmit={handleNewsletterSubmit}>
            <div className="email-input">
              <i className="fa-regular fa-envelope"></i>
              <input
                className="ebox"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button className="btn" type="submit">Subscribe</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className="sub-platform">
          <div className="sub-message">
            <h1>SUBSCRIBE</h1>
            <p>Subscribe on all platforms where the show is available!</p>
          </div>
          <div className="icon-links">
            <a href="https://soundcloud.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-soundcloud"></i></a>
            <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-spotify"></i></a>
            <a href="https://www.apple.com/apple-podcasts/" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-podcast"></i></a>
            <a href="https://rss.com/?gad_source=1&gclid=EAIaIQobChMIwJih9vS_hgMVCGdHAR3Y8QXPEAAYASAAEgJ0pfD_BwE" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-square-rss"></i></a>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewsSection reviews={reviews} />
      <div className="submission-container">
      <h3 className="form-title">Submit Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstInitial">First Initial</label>
          <input
            type="text"
            id="firstInitial"
            name="firstInitial"
            value={formData.firstInitial}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Submit Review</button>
      </form>
    </div>

    <div className="accent-div"></div>

      <Footer />
    </div>
  );
};

export default HomePage;
