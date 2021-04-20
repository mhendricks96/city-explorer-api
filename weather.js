'use strict'
const superagent = require('superagent');

function weather (request, response){
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

  
  function DailyForcast (day){
    this.date = day.datetime;
    this.description = day.weather.description;
    
    
  }

module.exports = weather;