const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT || 3002;

let axios = require('axios');

//////////////////
app.get('/',(request, response) => {
  response.send('hello from server');
});


app.get('/weather', async(request, response) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
    if(!cityData){
      response.send('Cannot find the city.');
    }
    let cities = cityData.data.data.map(eachDateObj => new Forecast(eachDateObj));
    response.send(cities);
  } catch (error) {
    response.send('Sorry not in the data');
  }
});

app.get('/movies', async (request ,response) => {
  try {
    let name = request.query.query;
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${name}`);
    if(!movieData){
      response.send('Cannot find the match.');
    }
    let movieResult = movieData.data.results.map(item => new Movie(item));
    response.send(movieResult);//object
  } catch (error) {
    response.send(error.message);
  }
});

app.get('*', (request, response) => {
  response.send('Route does not exist');
});


//handle any errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(cityObject) {
    this.description = `low of ${cityObject.low_temp}, hight of ${cityObject.max_temp} with ${cityObject.weather.description}`;
    this.date = cityObject.datetime;
  }
}

class Movie {
  constructor(movieObject){
    this.title = movieObject.original_title;
    this.releaseDate = movieObject.release_date;
    this.src = movieObject.poster_path;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
