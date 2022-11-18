const axios = require('axios');


async function weather(request, response) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
    if (!cityData) {
      response.send('Cannot find the city.');
    }
    let cities = cityData.data.data.map(eachDateObj => new Forecast(eachDateObj));
    response.send(cities);
  } catch (error) {
    response.send('Sorry not in the data');
  }
}

class Forecast {
  constructor(cityObject) {
    this.description = `low of ${cityObject.low_temp}, hight of ${cityObject.max_temp} with ${cityObject.weather.description}`;
    this.date = cityObject.datetime;
  }
}

module.exports = weather;
