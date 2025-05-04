// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipes');
const contactRoutes = require('./routes/contact');  
const menuRoutes = require('./routes/menuRoutes');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());  

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://praveena:praveena19@paytrack.y4owi.mongodb.net/?retryWrites=true&w=majority&appName=paytrack')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Add to your backend/server.js
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);
app.use('/api', contactRoutes); // Use contact routes
app.use('/api', menuRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});