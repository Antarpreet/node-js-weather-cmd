// var asyncAdd = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(typeof a === 'number' && typeof b === 'number') {
//                 resolve(a + b);
//             } else {
//                 reject('Arguments must be numbers');
//             }
//         }, 1500);
//     });
// }

// asyncAdd(2, 2).then(res => {
//     console.log(res);
//     return asyncAdd(res, 2);
// }).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey, It worked!');
//         // reject('It didn\'t work');
//     }, 2500);
// });

// somePromise.then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });
const request = require('request');
const api_key = 'AIzaSyC_75jCbztRDZBCqFOOAWcje817hopXErg';

var geocodeAddress = address => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${api_key}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to the Google servers.');
            } else if(body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if(body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                });
            }
        });
    });
}

geocodeAddress('19146').then(res => {
    console.log(JSON.stringify(res, undefined, 2));
}).catch(err => {
    console.log(err);
});