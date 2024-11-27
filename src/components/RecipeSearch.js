import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import './RecipeSearch.css';


const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const recipes = useSelector((state) => state.recipes);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.recipe.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for recipes..."
      />
      <div className="recipe-list">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe.recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
