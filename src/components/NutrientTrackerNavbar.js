// NutrientTrackerNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NutrientTrackerNavbar = () => {
  return (
    <nav className="nutrient-tracker-navbar">
      <ul>
        <li>
          <Link to="/nutrient-tracker">Dashboard</Link>
        </li>
        <li>
          <Link to="/nutrient-tracker/log-meals">Log Meals</Link>
        </li>
        <li>
          <Link to="/nutrient-tracker/daily-intake">Daily Intake</Link>
        </li>
        <li>
          <Link to="/nutrient-tracker/goals">Set Goals</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NutrientTrackerNavbar;
