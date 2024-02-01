// db.js

const mongoose = require('mongoose');

// Replace 'missing_persons_db' with the name of your MongoDB database
const dbName = 'missing_persons_db';

mongoose.connect(dbName, { useNewUrlParser: true, useUnifiedTopology: true })
.then( (result) => console.log('Connected to DB') )
.catch( (err) => console.log(err) );
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

module.exports = mongoose;
