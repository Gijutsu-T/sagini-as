const firebase = require('firebase/app');
require('firebase/database');

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
firebase.initializeApp(firebaseConfig);

// Function to save a new report to the database
async function saveData(data, node) {

  const db = firebase.database();
  
  const ref = db.ref(node);
  
  const newRef = await ref.push(data);
  
  return newRef.key;

}

// Export the function to save a report
module.exports = {
  saveReport,
};
