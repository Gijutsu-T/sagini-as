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
const db = firebase.database();

function showForm(formName) {
  // Hide all form fields (modify the selector if needed)
  document.querySelectorAll('.form-fields').forEach(form => form.style.display = 'none');

  // Show the selected form (adjust if needed)
  if (formName) { // Make sure formName is provided
    document.getElementById(formName).style.display = 'block'; 
  }
}

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {item.addEventListener('click', function() {
  // Remove 'active' class from any previously active item
  document.querySelector('.menu-item.active').classList.remove('active'); 

  // Add 'active' class to the clicked item
  this.classList.add('active');

  // Call showForm with the correct form name
  showForm(this.id); 
});
});


function showForm(type) {
  // Hide all form fields
  document.querySelectorAll('.form-fields').forEach(field => {
    field.style.display = 'none';
  });

  // Show the specific form fields based on the selected type
  const typeFields = document.getElementById(`${type.toLowerCase()}Fields`);
  if (typeFields) {
    typeFields.style.display = 'block';
  }
}

// Submit a report
function submitReport() {
  const reportTypeElement = document.getElementById('reportType');
  const descriptionElement = document.getElementById('description');
  const locationElement = document.getElementById('location');
  const nameElement = document.getElementById('name');

  if (reportTypeElement && descriptionElement && locationElement && nameElement) {
    const reportType = reportTypeElement.value;
    const description = descriptionElement.value;
    const location = locationElement.value;
    const name = nameElement.value;

    // Get a reference to the database
    var database = firebase.database();
    var reportsRef = database.ref('reports');

    console.log(`Report Type: ${reportType}, Description: ${description}, Location: ${location}, Name: ${name}`);
    // Create a new report object
    var newReportData = {
      reportType: reportType,
      description: description,
      location: location,
      name: name
    };

    // Add the new report data to the database under a new auto-generated key
    reportsRef.push(newReportData)
      .then(function(snapshot) {
        console.log("Report added successfully:", snapshot.key);

        // Reset the form
        document.getElementById('reportForm').reset();
      })
      .catch(function(error) {
        console.error("Error adding report:", error);
      });
  } else {
    console.error('One or more form elements not found.');
  }
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    fetchSearchResults(searchTerm);
  } else {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  }
}

function fetchSearchResults(searchTerm) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  fetch(`/search?term=${searchTerm}`) // Pass searchTerm as a query parameter
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