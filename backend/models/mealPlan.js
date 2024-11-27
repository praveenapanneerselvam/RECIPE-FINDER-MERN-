const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    Monday: { type: String, required: true },
    Tuesday: { type: String, required: true },
    Wednesday: { type: String, required: true },
    Thursday: { type: String, required: true },
    Friday: { type: String, required: true },
    Saturday: { type: String, required: true },
    Sunday: { type: String, required: true },
  });
  

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
