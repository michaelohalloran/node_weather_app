const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// console.log(argv);
geocode.geocodeAddress(argv.address, (errorMessage, results)=>{
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        //this grabs address property of the results object which is returned
        console.log(results.address);
        // console.log(results.latitude);
        let latitude = results.latitude;
        let longitude = results.longitude;
        weather.getWeather(latitude, longitude, (errorMsg, weatherResults)=> {
            if(errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(`It's currently ${weatherResults.temperature} but feels like ${weatherResults.apparentTemperature}.`);
            };
        });
    }
});



