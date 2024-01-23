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
  
    // Fetch and display search results from server
    
    const fakeResults = ['John Doe', 'Blue Sedan', 'Jane Smith'];
  
    fakeResults.forEach(result => {
      if (result.toLowerCase().includes(searchTerm)) {
        const li = document.createElement('li');
        li.textContent = result;
        resultsContainer.appendChild(li);
      }
    });
    
  }