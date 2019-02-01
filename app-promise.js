const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
const api_key = 'AIzaSyC_75jCbztRDZBCqFOOAWcje817hopXErg';
const weather_api_key = 'a5dd082daa532573bc907d63ca0df663';
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${api_key}`;

axios.get(geocodeUrl).then(res => {
    if(res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    
    var latitude = res.data.results[0].geometry.location.lat;
    var longitude = res.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${weather_api_key}/${latitude},${longitude}`;
    console.log(res.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then(res => {
    var temperature = res.data.currently.temperature;
    var apparentTemperature = res.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch(err => {
    if(err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(err.message);
    }
});