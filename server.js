'use strict'
//console.log('yea, mike');

const { response, query } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
//const weatherData = require('./data/weather.json');

app.use(cors());
const superagent = require('superagent');
const PORT = process.env.PORT || 3001;

//This is where most of my code will go

app.get('/movies', getMoviesFromapi);

  function getMoviesFromapi(request, response){
  console.log(request.query.citySubmitted);

  const url = 'https://api.themoviedb.org/3/search/movie';

  const query = {
    api_key: process.env.REACT_APP_MOVIE_API_KEY,
    query: request.query.citySubmitted,
  }

  superagent
    .get(url)
    .query(query)
    .then(movieResults => {
      console.log(movieResults.body.results);
      response.status(200).send(movieResults.body.results.map(movie => new MovieList(movie)))
    })
    .catch(err => {
      console.error(err)
    })
  }

////should now get the weather from weather api instead of local json file
app.get('/weather', getWeatherfromapi);

    // set up for easy superagent use
  function getWeatherfromapi (request, response){
  console.log(request.query.lat);
  console.log(request.query.lon);
 
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  
  const query = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lat: request.query.lat,
    lon: request.query.lon,
    
  }

  superagent
    .get(url)
    .query(query)
    .then(weatherResults => {
      response.status(200).send(weatherResults.body.data.map(day =>new DailyForcast(day)));
    })
    .catch(err => {
      console.error(err)
    })
  }
  


// things i want from api
// temp
// snow
// precip
function MovieList (movie){
  this.title = movie.original_title;
  this.description = movie.overview;
}

function DailyForcast (day){
  this.date = day.datetime;
  this.description = day.weather.description;
  
  
}


//proof of life/"landing"page
app.get('/',(request, response) => {
  response.send('chea!');
});




//function handleErrors(error, response){
  //response.status(500).send('Internal Error')
//}





app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
