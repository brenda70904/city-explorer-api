'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3002;

const weather = require('./modules/weather.js');
const movie = require('./modules/movie.js');

app.get('/', (req, res)=>
  res.send('hello from server'));

app.get('/weather', weatherHandler);

app.get('/movie', movieHandler);


async function weatherHandler(request, response) {
  const { lat, lon } = request.query;

  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong(Weather)!');
    });
}

async function movieHandler(request, response) {
  const city = request.query.cityName;

  movie(city)
    .then(summeries => response.send(summeries))
    .catch((error) => {
      console.log(error);
      response.status(200).send('Sorry, Something went wrong(movie)!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
