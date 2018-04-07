const request = require('request');

let myKey = '47d7465ae3e82172cc6e82205814a23e';
let myLat = '39.7392';
let myLng = '-104.9903';

const getWeather = (lat, lng, callback)=> {
    request({
        url: `https://api.darksky.net/forecast/${myKey}/${lat},${lng}`,
        json: true
    }, (error, response, body)=> {
        if(!error && response.statusCode === 200) {
            callback(undefined, { 
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        };
    });
}

module.exports.getWeather = getWeather;
