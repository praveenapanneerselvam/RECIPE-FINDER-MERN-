import React from 'react';
import { useFavorites } from './FavoritesContext'; // Adjust the path as necessary
import RecipeCard from './RecipeCard'; // Adjust the path as necessary
import './Favorites.css';
const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>Your Favorite Recipes</h1>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} /> // Spread the recipe props
        ))
      ) : (
        <p>No favorite recipes added.</p>
      )}
    </div>
  );
};

export default Favorites;
