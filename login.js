import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyD1-4J9Z9Z9J9Z9J9Z9J9Z9J9Z9J9Z9J9Z9",
  authDomain: "sagini-system.firebaseapp.com",
  projectId: "sagini-system",
  storageBucket: "sagini-system.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890abcdef",
  measurementId: "G-1234567890"
};

const app = initializeApp(firebaseConfig);

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const submit = document.getElementById('submit');

submit.addEventListener('click', function(event) {
  event.preventDefault()
  alert(5)
})
