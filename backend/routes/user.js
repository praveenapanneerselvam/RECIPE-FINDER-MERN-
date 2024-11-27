const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Contact = require('../models/Contact'); 

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { fullName, email, password, age, gender, weight, height, dietaryPreferences, healthConditions, restrictionIngredients, allergyIngredients } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName, email, password: hashedPassword, age, gender, weight, height,
      dietaryPreferences, healthConditions, restrictionIngredients, allergyIngredients
    });
    
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token, user });
});


router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
});



router.get('/saved-recipes', async (req, res) => {
  try {
    // Fetch saved recipes for a specific user
    const savedRecipes = await SavedRecipe.find({ userId: req.user.id });
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved recipes', error: error.message });
  }
});



router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact messages' });
  }
});


router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notifications' });
  }
});

module.exports = router;
