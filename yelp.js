'use strict'

const superagent = require('superagent');

const YELPCACHE = {};

function yelp(request, response){
  const url = 'https://api.yelp.com/v3/businesses/search';
  const city = request.query.citySubmitted;

  const query = {
    term: 'restaurants',
    location: city,
    limit: 5,
  }
    const headers =  {
      //contentType: application/json,
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      Accept: 'application/json',
    }


  superagent
    .get(url)
    .set(headers)
    .query(query)
    .then(yelpResults => {
      const yelpArray = yelpResults.body;
      response.status(200).send(yelpArray)
    })
    .catch(err => {
      console.error(err)
    })
    
}




module.exports = yelp;