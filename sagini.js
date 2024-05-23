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

// Sign up new users
function signUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      var user = userCredential.user;
      console.log("User signed up:", user);
    })
    .catch((error) => {
      console.error("Error signing up:", error);
    });
}

// Sign in existing users
function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      var user = userCredential.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var reportsDB = firebase.database().ref('reportForm');

document.getElementById('reportForm').addEventListener("submit",submitForm)

function showForm(type) {
  // Hide all form fields
  document.getElementById('carFields').style.display = 'none';
  document.getElementById('personFields').style.display = 'none';
  document.getElementById('otherFields').style.display = 'none';


  // Remove required attributes from hidden fields
  document.getElementById('age').removeAttribute('required');
  document.getElementById('gender').removeAttribute('required');
  document.getElementById('height').removeAttribute('required');
  document.getElementById('carType').removeAttribute('required');

  // Show the relevant form fields based on the type and set required attributes
  if (type === 'Car') {
    document.getElementById('carFields').style.display = 'block';
    document.getElementById('carType').setAttribute('required', '');
  } else if (type === 'Person') {
    document.getElementById('personFields').style.display = 'block';
    document.getElementById('age').setAttribute('required', '');
    document.getElementById('gender').setAttribute('required', '');
    document.getElementById('height').setAttribute('required', '');
  } else if (type === 'Object') {
    window.location.href = 'Database.html';
  }
}

function submitReport(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const nameElement = document.getElementById('name');
  const descriptionElement = document.getElementById('description');
  const locationElement = document.getElementById('location');
  const reportTypeElement = document.querySelector('.navbar__item.active');
 
  if (nameElement && descriptionElement && locationElement && reportTypeElement) {
    const name = nameElement.value;
    const description = descriptionElement.value;
    const location = locationElement.value;
    const reportType = reportTypeElement.id;

    let additionalData = {};

    if (reportType === 'car') {
      const carTypeElement = document.getElementById('carType');
      if (carTypeElement) {
        additionalData.carType = carTypeElement.value;
      }
    } else if (reportType === 'person') {
      const ageElement = document.getElementById('age');
      const genderElement = document.getElementById('gender');
      const heightElement = document.getElementById('height');
      if (ageElement && genderElement && heightElement) {
        additionalData.age = ageElement.value;
        additionalData.gender = genderElement.value;
        additionalData.height = heightElement.value;
      }
    }

    const newReportData = {
      name: name,
      description: description,
      location: location,
      reportType: reportType,
      ...additionalData
    };

    reportsDB.push(newReportData)
      .then(function(snapshot) {
        console.log("Report added successfully:", snapshot.key);
        document.getElementById('reportForm').reset();
      })
      .catch(function(error) {
        console.error("Error adding report:", error);
      });
  } else {
    console.error('One or more form elements not found.');
  }
}

document.getElementById('reportForm').addEventListener('submit', submitReport);

function searchReports() {
  const searchTerm = document.getElementById('search').value.trim();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (searchTerm) {
    // Example fetch call to a backend search endpoint
    fetch(`/search?term=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(result => {
          const li = document.createElement('li');
          li.textContent = result;
          resultsContainer.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching search results:', error));
  }
}

document.getElementById('search').addEventListener('input', searchReports);
