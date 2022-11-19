const axios = require('axios');

async function movie(request, response) {
  try {
    let name = request.query.query;
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${name}`);
    if (!movieData) {
      response.send('Cannot find the match.');
    }
    let movieResult = movieData.data.results.map(item => new Movie(item));
    response.send(movieResult);//object
  } catch (error) {
    response.send(error.message);
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

module.exports = movie;
