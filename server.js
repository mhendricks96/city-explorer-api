'use strict'
//console.log('yea, mike');

const { response, query } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


app.use(cors());
const superagent = require('superagent');
const movies = require('./movies.js');
const weather = require('./weather.js')
const PORT = process.env.PORT || 3001;

//This is where most of my code will go

app.get('/movies', movies);


////should now get the weather from weather api instead of local json file
app.get('/weather', weather);

    

//proof of life/"landing"page
app.get('/',(request, response) => {
  response.send('chea!');
});



app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
