const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  dietaryPreferences: String,
  healthConditions: String,
  restrictionIngredients: String,
  allergyIngredients: String,
});

module.exports = mongoose.model('User', UserSchema);
