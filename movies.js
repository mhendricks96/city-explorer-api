'use strict'
const superagent = require('superagent');


function movies(request, response){
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

  function MovieList (movie){
    this.title = movie.original_title;
    this.description = movie.overview;
  }

module.exports = movies;