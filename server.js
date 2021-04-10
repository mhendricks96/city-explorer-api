//console.log('yea, mike');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

//This is where most of my code will go

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
