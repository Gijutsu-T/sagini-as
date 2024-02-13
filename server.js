const express = require('express');
const path = require('path');
const app = express();
const firebase = require('firebase/app');
require('firebase/database');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_CF_VYwKz_xH1pol39O-gbcq3L-_ANYQ",
  authDomain: "sagini-alert.firebaseapp.com",
  databaseURL: "https://sagini-alert-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sagini-alert",
  storageBucket: "sagini-alert.appspot.com",
  messagingSenderId: "407884373806",
  appId: "1:407884373806:web:6bb2e7902c6eca413224bf",
  measurementId: "G-XE9KDHLFHN"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Add middleware to parse JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname, '.')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'sagini.html'));
});
// Route to handle creating a missing person
app.post('/missing-persons', async (req, res) => {
  try {
    await firebase.database().ref('missing-persons').push(req.body);
    console.log('Person created:', req.body); // Log the created person to the console
    res.status(201).json(req.body);
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
