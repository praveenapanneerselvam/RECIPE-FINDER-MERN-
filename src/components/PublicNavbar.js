
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const PublicNavbar = () => {
  return (
    <nav className="navbar">
      <h2>Recipe Finder</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/adminlogin">Admin Login</Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
