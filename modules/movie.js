const axios = require('axios');
let cache = require('./cache.js');

require('dotenv').config();

module.exports = getmovie;

function getmovie(cityName) {
  const key = 'city-' + cityName;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  let setTime = 1000 * 60 * 60; //1 hour
  if (cache[key] && Date.now() - cache[key].timestamp < setTime) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (error) {
    return Promise.reject(error);
  }
}

class Movie {
  constructor(movieObject) {
    this.title = movieObject.original_title;
    this.releaseDate = movieObject.release_date;
    this.overView = movieObject.overview;
    this.src = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
  }
}
