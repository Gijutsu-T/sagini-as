// index.js

require('./db');
const Report = require('./models/Report');

async function main() {
  // Read existing reports
  const reportsBeforeUpdate = await Report.find();
  console.log('Reports before update:', reportsBeforeUpdate);

  // If there are existing reports, update the first one
  if (reportsBeforeUpdate.length > 0) {
    const firstReport = reportsBeforeUpdate[0];
    const id = firstReport._id;

    // Update
    await Report.updateOne({ _id: id }, {
      name: 'Updated Name', // Updated name
      lastSeen: 'Updated Location', // Updated location
    });

    console.log('Report updated successfully!');
  } else {
    console.log('No existing reports to update.');
  }

  // Read after update
  const reportsAfterUpdate = await Report.find();
  console.log('Reports after update:', reportsAfterUpdate);

  // Create a new report
  const newReport = new Report({
    name: 'New Report Name',
    age: 25,
    gender: 'Male',
    height: 180,
    description: 'New report description',
    lastSeenLocation: 'New Location',
  });

  const savedNewReport = await newReport.save();
  console.log('New report created successfully:', savedNewReport);

  // Read after creation
  const reportsAfterCreation = await Report.find();
  console.log('Reports after creation:', reportsAfterCreation);
}

main();
