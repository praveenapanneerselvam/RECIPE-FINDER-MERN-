const express = require('express');
const Recipe = require('../models/Recipe'); // Import Recipe model
const router = express.Router();


router.post('/recipes', async (req, res) => {
  const { name, ingredients, instructions, dietType, healthLabels, recipeImage, prepTime } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      dietType,
      healthLabels,
      recipeImage,
      prepTime,
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ message: 'Failed to save recipe' });
  }
});



router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
});


router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
});


router.put('/recipes/:id', async (req, res) => {
  const { name, ingredients, instructions, dietType, healthLabels } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        name,
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        instructions,
        dietType,
        healthLabels: healthLabels ? healthLabels.split(',').map(label => label.trim()) : []
      },
      { new: true }
    );

    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
});


router.delete('/recipes/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
});

module.exports = router;
