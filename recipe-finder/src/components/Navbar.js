import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    
    localStorage.removeItem('user'); 
    navigate('/');
  };

  return (
    <nav>
      <Link to="/recipes">Recipes</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/weekly-planner">Weekly Planner</Link>
      <Link to="/recipeform">Add Recipe</Link>
        <Link to="/nutrient-tracker">Nutrient Tracker</Link>
        <Link to="/user-dashboard">DASHBOARD</Link>
     <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </nav>
  );
};

export default Navbar;