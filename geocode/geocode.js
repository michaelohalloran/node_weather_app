const request = require('request');

const geocodeAddress = (address, callback)=> {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body)=> {
        if(error) {
            callback('Can\'t reach Google servers');
        } else if(body.status === "ZERO_RESULTS") {
            callback('Could not find that address');
        } else if(body.status === "OK") {
            //since this is success case, first arg is undefined, as that will be the value of errorMessage in case of success
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        };
    });
}

module.exports.geocodeAddress = geocodeAddress;