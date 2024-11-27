
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/contact/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact submission saved successfully' });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;