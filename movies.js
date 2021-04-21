'use strict'
const superagent = require('superagent');
//sets up empty cace.
const MOVIECACHE = {};


function movies(request, response){
  //console.log(request.query.citySubmitted);
  const city = request.query.citySubmitted;

  if(MOVIECACHE[city] && (Date.now() - MOVIECACHE[city][0]) < (1000 * 60 * 60 * 24 * 7) ) {
    console.log('movie saved in cache');
    let previousSearch = MOVIECACHE[city][1];
    response.status(200).send(previousSearch)
  }else{
    console.log('movie coming from api');
    const url = 'https://api.themoviedb.org/3/search/movie';
  
    const query = {
      api_key: process.env.REACT_APP_MOVIE_API_KEY,
      query: request.query.citySubmitted,
    }
  
    superagent
      .get(url)
      .query(query)
      .then(movieResults => {
        const movieArray = movieResults.body.results.map(movie => new MovieList(movie));
        //console.log(movieResults.body.results);
        MOVIECACHE[city] = [Date.now() ,movieArray];
        response.status(200).send(movieArray);
      })
      .catch(err => {
        console.error(err)
      })
    }
  }


  function MovieList (movie){
    this.title = movie.original_title;
    this.description = movie.overview;
  }

module.exports = movies;