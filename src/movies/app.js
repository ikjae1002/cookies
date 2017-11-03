// app.js
const express = require('express');
require('./db');
const bodyParser = require('body-parser');
const app = express();


const mongoose = require('mongoose');
const movie = mongoose.model('Movie');

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  movie.find(function(err, movies, count) {
    if(err) {
      res.send(err); 
    } 
    console.log('Movie', movie);
    res.render( 'index', {
      movie: movie
    });
  });
});

app.listen(3000);
