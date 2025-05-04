import React from 'react';
import './RecipeDetailsModal.css';


const RecipeDetailsModal = ({ recipe, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>{recipe.label}</h2>
        <img src={recipe.image} alt={recipe.label} />

        {recipe.source && (
          <p>Source: <a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.source}</a></p>
        )}
        <p>Yield: {recipe.yield}</p>
        <p>Calories: {Math.round(recipe.calories)}</p>
        {recipe.totalWeight && <p>Total Weight: {recipe.totalWeight.toFixed(2)} g</p>}
        {recipe.totalTime && <p>Total Time: {recipe.totalTime} mins</p>}
        
        {recipe.cuisineType && <p>Cuisine Type: {recipe.cuisineType.join(', ')}</p>}
        {recipe.mealType && <p>Meal Type: {recipe.mealType.join(', ')}</p>}
        {recipe.dishType && <p>Dish Type: {recipe.dishType.join(', ')}</p>}

        {recipe.dietLabels.length > 0 && (
          <>
            <h3>Diet Labels</h3>
            <ul>{recipe.dietLabels.map((label, index) => <li key={index}>{label}</li>)}</ul>
          </>
        )}

        {recipe.cautions.length > 0 && (
          <>
            <h3>Health Cautions</h3>
            <ul>{recipe.cautions.map((caution, index) => <li key={index}>{caution}</li>)}</ul>
          </>
        )}

        {recipe.ingredientLines && (
          <>
            <h3>Ingredients</h3>
            <ul>{recipe.ingredientLines.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
          </>
        )}

        {recipe.totalNutrients && (
          <>
            <h3>Total Nutrients</h3>
            <ul>{Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
              <li key={key}>{nutrient.label}: {nutrient.quantity.toFixed(2)} {nutrient.unit}</li>
            ))}</ul>
          </>
        )}

        {recipe.totalDaily && (
          <>
            <h3>Total Daily</h3>
            <ul>{Object.entries(recipe.totalDaily).map(([key, daily]) => (
              <li key={key}>{daily.label}: {daily.quantity.toFixed(2)} {daily.unit}</li>
            ))}</ul>
          </>
        )}

        {recipe.digest && (
          <>
            <h3>Digest</h3>
            <ul>{recipe.digest.map((item, index) => (
              <li key={index}>{item.label}: {item.total.toFixed(2)} {item.unit}</li>
            ))}</ul>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsModal;
