//console.log('yea, mike');

const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT || 3001;

//This is where most of my code will go

app.use(cors());

app.get('/weather', (request, response) => {
  response.json(weatherData);
})

app.get('/',(request, response) => {
  response.send('chea!');
});

let forcastData = [];

function Forcast (date, description){
  this.date = date;
  this.description = description;
  forcastData.push(this);
}



app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
