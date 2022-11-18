const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT || 3002;


//home
app.get('/', (request, response) => {
  response.send('hello from server');
});

//weather
let weather = require('./weather');
app.get('/weather', weather);

//movie
let movie = require('./movie');
app.get('/movies', movie);

//handle route
app.get('*', (request, response) => {
  response.send('Route does not exist');
});

//handle any errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
