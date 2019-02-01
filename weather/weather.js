const request = require('request');
const api_key = 'a5dd082daa532573bc907d63ca0df663';

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${api_key}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to forecast.io service.');
        } else if(response.statusCode == 400) {
            callback('Unable to fetch weather.' + body.error);
        } else if(response.statusCode == 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.getWeather = getWeather;