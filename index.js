// index.js
require('./db'); 
const Kitten = require('./models');

// CRUD operations here
async function main() {

    // Create
    const kitty = new Kitten({name: 'Fluffy'});
    await kitty.save();
    
    // Read
    const kittens = await Kitten.find();
    console.log(kittens);
  
    // Update
    await Kitten.updateOne({_id: id}, {name: 'Fluffers'});
  
    // Delete 
    await Kitten.deleteOne({_id: id});
  }
  
  main();