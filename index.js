
import firebase from 'firebase/app';

async function main() {
  // Get a reference to the database
  const db = firebase.database();

  // Reference to the "reports" node in the database
  const reportsRef = db.ref('reports');

  // Read existing reports
  reportsRef.once('value', (snapshot) => {
    const reports = snapshot.val();
    console.log('Reports before update:', reports);

    if (reports) {
      // Get the key of the first report
      const reportKeys = Object.keys(reports);
      const firstReportKey = reportKeys[0];
      
      // Update the first report
      const updates = {};
      updates[`${firstReportKey}/name`] = 'Updated Name';
      updates[`${firstReportKey}/lastSeen`] = 'Updated Location';
      reportsRef.update(updates);

      console.log('Report updated successfully!');
    } else {
      console.log('No existing reports to update.');
    }
  });

  // Create a new report
  const newReportData = {
    name: 'New Report Name',
    age: 25,
    gender: 'Male',
    height: 180,
    description: 'New report description',
    lastSeenLocation: 'New Location',
  };

  const newReportRef = reportsRef.push(newReportData);
  console.log('New report created successfully with key:', newReportRef.key);

  // Read after creation
  reportsRef.once('value', (snapshot) => {
    const reports = snapshot.val();
    console.log('Reports after creation:', reports);
  });
}

main();
