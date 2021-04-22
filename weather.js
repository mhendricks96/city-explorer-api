'use strict'
const superagent = require('superagent');
//sets up empty cache

//values for the keys in the cache array
//arr[0] is the time
//arr[1] is the data
const WEATHERCACHE = {};

function weather (request, response){
  
  const city = request.query.city;
  console.log(city)
  //if the city search is in cache
  if(WEATHERCACHE[city] && (Date.now() - WEATHERCACHE[city][0]) < (1000 * 60 * 60 * 6)) {
    console.log('weather pulling from cache');
    //dont go to api, get results from cache
    let previousSearch = WEATHERCACHE[city][1];
    response.status(200).send(previousSearch);
  }else {
    //dont have this city saved, get it from the api
    console.log('weather requested from api');
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
        const weatherArray = weatherResults.body.data.map(day =>new DailyForcast(day));
        //saving the array of weather to my cache.
        //also save current time
        WEATHERCACHE[city] = [Date.now(),weatherArray];
        response.status(200).send(weatherArray);
      })
      .catch(err => {
        console.error(err)
      })
    }
  }



  
  function DailyForcast (day){
    this.date = day.datetime;
    this.description = day.weather.description;
    
    
  }

module.exports = weather;