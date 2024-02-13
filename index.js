
// index.js

import firebase from 'firebase/app';
import 'firebase/database';

const models = require('./models');

const data = {
  name: 'Test'  
};

const key = await models.saveData(data, 'reports');

// Firebase config
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

// Get database reference
const db = firebase.database();

// Reference 'reports' collection
const reportsRef = db.ref('reports');

// Add new report
const newReportRef = reportsRef.push({
  name: 'John Doe',
  age: 30,
  location: 'New York' 
});

// Read reports
reportsRef.on('value', snapshot => {
  const reports = snapshot.val();
  console.log(reports);
}, error => {
  console.error(error);  
});

// Update a report
reportsRef.child(newReportRef.key)
  .update({
    name: 'Jane Doe'
  });

// Delete a report
reportsRef.child(newReportRef.key).remove();

// Listen for changes
reportsRef.on('child_added', snapshot => {
  console.log('New report added:', snapshot.val());
});

reportsRef.on('child_changed', snapshot => {
  console.log('Report updated:', snapshot.val());  
});

reportsRef.on('child_removed', snapshot => {
  console.log('Report removed:', snapshot.val());
});