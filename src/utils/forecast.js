const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=17fcbcffcf53c788d96f2eb68696f038&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, response) => {
    const { error: errorApi, current } = response.body;
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (errorApi) {
      callback("Unable to find weather forcast", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It's currently ${temperature} Degrees Fahrenheit out, feels like ${feelslike} Degrees Fahrenheit.`
      );
    }
  });
};

module.exports = forecast;
