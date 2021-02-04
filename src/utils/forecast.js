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
      console.log(current);
      const {
        weather_descriptions,
        temperature,
        feelslike,
        is_day,
        precip,
        humidity,
      } = current;

      callback(undefined, {
        forecast1: `Now it's ${
          is_day === "yes" ? "day" : "night"
        } here. Overall weather condition is ${weather_descriptions[0]}`,
        forecast2: `Outdoor temperature feels like ${feelslike}°F though actual temp. is ${temperature}°F along with humidity of ${humidity}% `,
        forecast3: `${
          precip === 0
            ? `No chances of rain today :)`
            : `Chances of rain is ${precip} Inch`
        }`,
      });
    }
  });
};

module.exports = forecast;
