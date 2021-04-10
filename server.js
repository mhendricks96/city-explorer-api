//console.log('yea, mike');

const { response } = require('express');
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

//This is where most of my code will go

app.get('/',(request, response) => {
  response.send('chea!');
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
