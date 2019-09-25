const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib3JsYW5kbzkxIiwiYSI6ImNqemxjNW1rNjBybmMzbXFuN2FkNXNzbDkifQ.hj0dHoeif10kntQOV8Zyuw&limit=1'

    request ({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to Geocoding Server", undefined)
        }else if(body.features.length === 0){
            callback('Endpoint provided is incorrect', undefined)
        }else{
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const coordinates = longitude + ',' + latitude
            const location = body.features[0].place_name
            callback(undefined, {
                coordinates: coordinates,
                location: location
            })
        }
    })
}

module.exports = geocode