const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Report = require('./models');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/missing_persons_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});


// Add middleware to parse JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname, '.')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'sagini.html'));
});
// Route to handle creating a missing person
app.post('/missing-persons', async (req, res) => {
  try {
    const newPerson = await Report.create(req.body);
    console.log('Person created:', newPerson); // Log the created person to the console
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating missing person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});

app.listen(4000, function () {
  console.log('App listening on port 4000!');
});