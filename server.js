const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3002;

let data = require('./data/weather.json');

app.get('/',(request, response) => {
  response.send('hello from server');
});


app.get('/weather', (request, response) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon; //All lowercase
    let cityData = data.find(item => item.lat === lat && item.lon === lon);

    let cities = cityData.data.map(eachDateObj => new Forecast(eachDateObj));
    // let city = cityDat
    // let cityResult = new Forecast(cityData);
    // let eattle = new Forecast(cityData);
    // let paris = nesw Forecast(cityData);
    // let amman = new Forecast(cityData);
    // let cities = [seattle, paris, amman];
    response.send(cities);
  } catch (error) {
    console.log('Sorry not in the data');
  }
});



app.get('*', (request, response) => {
  response.send('Route does not exist');
});


//handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(cityObject) {
    this.description = `low of ${cityObject.low_temp}, hight of ${cityObject.max_temp} with ${cityObject.weather.description}`;
    this.date = cityObject.datetime;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
