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
    const reportType = document.getElementById('reportType').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const name = document.getElementById('name').value;
    console.log(`Report Type: ${reportType}, Description: ${description}, Location: ${location}, Name: ${name}`);
    
 
 
    document.getElementById('reportForm').reset();
}

  
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
