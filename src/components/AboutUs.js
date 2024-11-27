import React from 'react';
import './AboutUs.css'; // Import custom CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to the Recipe Finder app, where we offer a wide variety of recipes tailored to your health, 
        dietary preferences, and personal taste. Whether you're managing a health condition, following a specific 
        diet, or simply looking for new meal ideas, we are here to help you discover the best recipes and meal plans. 
        Our goal is to make healthy eating fun, easy, and accessible for everyone!
      </p>
      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-text">
        Our mission is to provide a user-friendly platform where individuals can easily find recipes that suit 
        their specific needs—whether it's for weight loss, muscle gain, managing a health condition, or simply 
        eating for enjoyment. We believe food should be delicious, nutritious, and suited to your lifestyle.
      </p>
    </div>
  );
};

export default AboutUs;
