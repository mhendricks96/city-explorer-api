//console.log('yea, mike');

const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const weatherData = require('./data/weather.json');

app.use(cors());
const PORT = process.env.PORT || 3001;

//This is where most of my code will go
app.get('/weather', (request, response) => {
  try {
    //request.lat, request.lon;
    const forcastData = weatherData.data.map(day => new Forcast(day));
    response.json(forcastData);
  } catch(error){
    handleErrors(error, response)
  }
});
  

app.get('/',(request, response) => {
  response.send('chea!');
});


function Forcast (day){
  this.date = day.datetime;
  this.description = day.weather.description;
  this.highTemp = day.max_temp;
  this.lowTemp = day.min_temp;
}

function handleErrors(error, response){
  response.status(500).send('Internal Error')
}

//This is all dynamic above

//new Forcast(weatherData.data[0].datetime, weatherData.data[0].weather.description, weatherData.data[0].max_temp, weatherData.data[0].min_temp);
//new Forcast(weatherData.data[1].datetime, weatherData.data[1].weather.description, weatherData.data[1].max_temp, weatherData.data[1].min_temp);
//new Forcast(weatherData.data[2].datetime, weatherData.data[2].weather.description, weatherData.data[2].max_temp, weatherData.data[2].min_temp);
//new Forcast(weatherData.data[3].datetime, weatherData.data[3].weather.description, weatherData.data[3].max_temp, weatherData.data[3].min_temp);
//new Forcast(weatherData.data[4].datetime, weatherData.data[4].weather.description, weatherData.data[4].max_temp, weatherData.data[4].min_temp);
//new Forcast(weatherData.data[5].datetime, weatherData.data[5].weather.description, weatherData.data[5].max_temp, weatherData.data[5].min_temp);
//new Forcast(weatherData.data[6].datetime, weatherData.data[6].weather.description, weatherData.data[6].max_temp, weatherData.data[6].min_temp);
//new Forcast(weatherData.data[7].datetime, weatherData.data[7].weather.description, weatherData.data[7].max_temp, weatherData.data[7].min_temp);
//new Forcast(weatherData.data[8].datetime, weatherData.data[8].weather.description, weatherData.data[8].max_temp, weatherData.data[8].min_temp);
//new Forcast(weatherData.data[9].datetime, weatherData.data[9].weather.description, weatherData.data[9].max_temp, weatherData.data[9].min_temp);
//new Forcast(weatherData.data[10].datetime, weatherData.data[10].weather.description, weatherData.data[10].max_temp, weatherData.data[10].min_temp);
//new Forcast(weatherData.data[11].datetime, weatherData.data[11].weather.description, weatherData.data[11].max_temp, weatherData.data[11].min_temp);
//new Forcast(weatherData.data[12].datetime, weatherData.data[12].weather.description, weatherData.data[12].max_temp, weatherData.data[12].min_temp);
//new Forcast(weatherData.data[13].datetime, weatherData.data[13].weather.description, weatherData.data[13].max_temp, weatherData.data[13].min_temp);
//new Forcast(weatherData.data[14].datetime, weatherData.data[14].weather.description, weatherData.data[14].max_temp, weatherData.data[14].min_temp);
//new Forcast(weatherData.data[15].datetime, weatherData.data[15].weather.description, weatherData.data[15].max_temp, weatherData.data[15].min_temp);




app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
