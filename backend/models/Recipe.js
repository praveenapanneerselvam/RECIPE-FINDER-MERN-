
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  dietType: { type: String, required: false },
  healthLabels: { type: [String], required: false },
  recipeImage: { type: String, required: false },
  prepTime: { type: String, required: false },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
