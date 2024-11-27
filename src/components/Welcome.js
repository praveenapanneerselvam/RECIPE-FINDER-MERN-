import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to the Recipe Finder</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Welcome;
