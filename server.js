//server.js
const path = require('path'); // Import the 'path' module
const express = require('express'); // Import the 'express' module
const firebase = require('firebase/compat/app'); // Import the 'firebase/app' module
require('firebase/compat/database')// Import the 'firebase/database' module

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

// Create an Express application
const app = express();
// middleware to parse JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname, '.')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'sagini.html'));
});


const db = firebase.database(); // Get a reference to the database

// Create missing person
app.post('/missing-persons', (req, res) => {
  const newPerson = req.body;

  db.ref('missing-persons').push(newPerson)
    .then(() => {
      res.status(201).send('Missing person created');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating missing person');
    });
});

// Get all missing persons (with optional search)
app.get('/missing-persons', (req, res) => {
  const term = req.query.term;

  let query = db.ref('missing-persons'); // Start with base reference

  if (term) {
    // Modify this to match the field you want to search by (e.g. name, description)
    query = query.orderByChild('name').startAt(term).endAt(term + "\uf8ff");
  }

  query.on('value', snapshot => {
    const data = snapshot.val();
    res.json(data);
  }, error => {
    console.log(error);
    res.status(500).send('Error retrieving missing persons');
  });
});

// Start the server
const PORT = 4000;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});

