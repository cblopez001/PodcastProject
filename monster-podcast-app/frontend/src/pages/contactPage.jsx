import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/contact.css'; // Import the CSS file for this page
import Footer from '../components/Footer'; // Import the Footer component
import Navbar from '../components/Navbar';

const ContactPage = () => {
  return (
    <>
      <div className="contact-container text-center">
        <h1>Thank You for Reaching Out!</h1>
        <p className="lead">
          We appreciate your interest in connecting with us! Whether you have a question, 
          a suggestion for a new episode, or a video idea you'd like to see, we're all ears.
        </p>
        <p>
          Feel free to share your thoughts, ideas, or any inquiries you have. Your input helps us create content 
          that you love and enjoy!
        </p>
        <div class=".button-wrapper">
        <button 
          className="btn btn-primary mt-4"
          onClick={() => window.open('https://us10.list-manage.com/contact-form?u=fa89eaac4ba47413996871882&form_id=0c93f2cb7fca4eefdde5fc8f68082ad6', '_blank')}
        >
          Go to Contact Form
        </button>
        </div>
      </div>

      <div className="accent-div"></div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactPage;
