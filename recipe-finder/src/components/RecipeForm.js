import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeForm.css';

const RecipeForm = ({ userId }) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dietType, setDietType] = useState('');
  const [healthLabels, setHealthLabels] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [submittedRecipe, setSubmittedRecipe] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // You can remove this effect if you don't use recipes anywhere
    // If you want to keep fetching recipes for another purpose, keep it
    // Otherwise, remove the recipes state and this effect
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!recipeName.trim()) newErrors.recipeName = 'Recipe name is required';
    if (!ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!instructions.trim()) newErrors.instructions = 'Instructions are required';
    if (healthLabels && healthLabels.trim() && healthLabels.split(',').some(label => label.trim() === ''))
      newErrors.healthLabels = 'Health Labels should be comma separated values';
    if (prepTime && !/^\d+\s*(minutes|hour|hours|minute)$/i.test(prepTime))
      newErrors.prepTime = 'Preparation time should be in the format (e.g., "30 minutes")';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newRecipe = {
      name: recipeName,
      ingredients,
      instructions,
      dietType,
      healthLabels: healthLabels.split(',').map(label => label.trim()),
      recipeImage,
      prepTime,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/recipes', newRecipe);
      setSubmittedRecipe(response.data.recipe);

      setRecipeName('');
      setIngredients('');
      setInstructions('');
      setDietType('');
      setHealthLabels('');
      setRecipeImage('');
      setPrepTime('');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  return (
    <div className="recipe-form">
      <h3>Add a New Recipe</h3>

      <input
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="Recipe Name"
      />
      {errors.recipeName && <span className="error">{errors.recipeName}</span>}

      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (separate with commas)"
      />
      {errors.ingredients && <span className="error">{errors.ingredients}</span>}

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
      />
      {errors.instructions && <span className="error">{errors.instructions}</span>}

      <input
        type="text"
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
        placeholder="Diet Type (e.g., Vegan, Gluten-Free)"
      />

      <input
        type="text"
        value={healthLabels}
        onChange={(e) => setHealthLabels(e.target.value)}
        placeholder="Health Labels (separate with commas)"
      />
      {errors.healthLabels && <span className="error">{errors.healthLabels}</span>}

      <input
        type="text"
        value={recipeImage}
        onChange={(e) => setRecipeImage(e.target.value)}
        placeholder="Recipe Image URL (optional)"
      />

      <input
        type="text"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Preparation Time (e.g., 30 minutes)"
      />
      {errors.prepTime && <span className="error">{errors.prepTime}</span>}

      <button onClick={handleSubmit}>Add Recipe</button>

      {submittedRecipe && (
        <div className="submitted-recipe">
          <h4>Submitted Recipe:</h4>
          <p><strong>Recipe Name:</strong> {submittedRecipe.name}</p>
          <p><strong>Ingredients:</strong> {submittedRecipe.ingredients}</p>
          <p><strong>Instructions:</strong> {submittedRecipe.instructions}</p>
          <p><strong>Diet Type:</strong> {submittedRecipe.dietType}</p>
          <p><strong>Health Labels:</strong> {submittedRecipe.healthLabels.join(', ')}</p>
          {submittedRecipe.recipeImage && (
            <div className="recipe-image">
              <img src={submittedRecipe.recipeImage} alt={submittedRecipe.name} />
            </div>
          )}
          <p><strong>Preparation Time:</strong> {submittedRecipe.prepTime}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;