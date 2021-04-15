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



////should not get the weather from weather api instead of local json file
app.get('/weather', getWeatherfromapi);

    // set up for easy superagent use
    

function getWeatherfromapi (request, response){
  console.log(request.query.lat);
  console.log(request.query.lon);
  //const weatherQuery = 'bees';
  //const lat = request.query.lat,
  //const lon = request.query.lon,
  const url = 'https://api.weatherbit.io/v2.0/current';
  const query = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lat: request.query.lat,
    lon: request.query.lon,
    include: 'minutely',
  }

  superagent
    .get(url)
    .query(query)
    .then(weatherResults => {
      response.status(200).send(weatherResults.body.minutely.map(minute =>new MinuteForcast(minute)) );
    })
  }
  


// things i want from api
// temp
// snow
// precip


function MinuteForcast (minute){
  this.temp = minute.temp;
  this.precip = minute.precip;
}


//proof of life/"landing"page
app.get('/',(request, response) => {
  response.send('chea!');
});











//function Forcast (day){
  //this.date = day.datetime;
  //this.description = day.weather.description;
  //this.highTemp = day.max_temp;
  //this.lowTemp = day.min_temp;
//}

function handleErrors(error, response){
  response.status(500).send('Internal Error')
}





app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
