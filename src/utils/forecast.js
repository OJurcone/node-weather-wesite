const request  = require('request')

const forecast = (coordinates, callback) => {
    const url = 'https://api.darksky.net/forecast/ba64d2180613add34c0f0ad51cdc25ad/' + coordinates + '?units=si'
    request({url, json:true}, (error, {body} = {}) =>{
        if (error){
            callback('Unable to connect to weather Service', {
            })
        }else if(body.error){
            callback('Unable to find location', {
            })
            }else{
                callback(undefined, {
                    temperatureLow: 'The lowest temperature today is: ' + body.daily.data[0].temperatureLow,
                    temperature: 'It is currently ' + body.currently.temperature + '°C degrees out.',
                    temperatureMax: 'The highest temperature today will be: ' + body.daily.data[0].temperatureHigh, 
                    precipitation: 'There is a ' + body.currently.precipProbability + '% chance of rain'
                })
            }    
    })
}
 
module.exports = forecast