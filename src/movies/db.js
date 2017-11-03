// db.js
// as always, require the module
const mongoose = require('mongoose'); 

// some extra stuff goes here...

// define the data in our collection
// const Movie = new mongoose.Schema({
//   Title: String,
//   Author: String,
//   Age: Date,
//   Publisher: String,
//   Reviews:[
//       {Rating: Number, Comments: String}
//   ]
//});

// "register" it so that mongoose knows about it
//mongoose.model('Movie', Movie);



// connect to the database (catdb)
mongoose.connect('');
