const firebase = require('firebase/app');

// Function to save a new report to the database
async function saveReport(reportData, reportType) {
  const db = firebase.database();
  const reportsRef = db.ref(reportType); // Replace 'reports' with the report type
  const newReportRef = reportsRef.push(reportData);
  return newReportRef.key;
}

// Export the function to save a report
module.exports = {
  saveReport,
};
