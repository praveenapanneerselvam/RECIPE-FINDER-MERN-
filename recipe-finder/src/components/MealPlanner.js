

import React, { useState } from 'react';

const MealPlanner = () => {
  const [meals] = useState({});

  const handleAddRecipe = () => {
    
    alert('Add Recipe functionality coming soon!');
  };

  return (
    <div>
      <h1>Meal Planner</h1>
      <button onClick={handleAddRecipe}>Add Recipe</button>
      <div>
        {Object.keys(meals).map((day) => (
          <div key={day}>
            <h2>{day}</h2>
            <ul>
              {meals[day].map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
