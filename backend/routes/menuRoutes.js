
const express = require('express');
const router = express.Router();
const MealPlan = require('../models/mealPlan'); // assuming the model is located here


router.post('/menu', async (req, res) => {
  try {
    const mealPlan = new MealPlan(req.body);
    await mealPlan.save();
    res.status(201).json({ message: 'Meal plan saved successfully', plan: mealPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error saving meal plan', error });
  }
});

module.exports = router;
