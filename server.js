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


// Create missing person
app.post('/missing-persons', (req, res) => {

  const newPerson = req.body;

  // Use db reference
  db.ref('missing-persons').push(newPerson, (error) => { 
    if (error) {
      console.log(error);
      return res.status(500).send('Error creating missing person');  
    } else {
      return res.status(201).send('Missing person created');
    }
  });

});


// Get all missing persons
app.get('/missing-persons', (req, res) => {

  // Use db reference
  db.ref('missing-persons').on('value', snapshot => {
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
