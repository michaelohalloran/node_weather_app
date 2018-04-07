const yargs = require('yargs');
var axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=> {
    //in axios, response.data is equivalent of geocode's body
    if(response.data.status==="ZERO_RESULTS") {
        throw new Error('Unable to find that address');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/47d7465ae3e82172cc6e82205814a23e/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    //the following returns a response after making the call to weatherUrl
    return axios.get(weatherUrl);
}).then((response)=> {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} but feels like ${apparentTemperature}`);
}).catch((error)=> {
    if (error.code ==="ENOTFOUND") {
        console.log('Cannot connect to API servers');
    } else {
        console.log(error.message);
    }
    
})


