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
window.submitReport = function() {
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
      // Reset the form
                    document.getElementById('reportForm').reset();
          {
                    console.error('One or more form elements not found.');
                } // Add this closing curly brace

                
                function searchReports() {
                
                  const searchTerm = document.getElementById('search').value.toLowerCase();
                  
                  const resultsContainer = document.getElementById('results');
                  
                  resultsContainer.innerHTML = '';
                  
                  // Fetch and display search results from the server
                fetch(`/search?term=${searchTerm}`) // Modify the endpoint based on your server implementation
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
