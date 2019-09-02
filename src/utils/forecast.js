const request  = require('request')

const forecast = (coordinates, callback) => {
    const url = 'https://api.darksky.net/forecast/ba64d2180613add34c0f0ad51cdc25ad/' + coordinates + '?units=si'
    request({url, json:true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to weather Service', {
                temperature:undefined,
                precipitation: undefined
            })
        }else if(body.error){
            callback('Unable to find location', {
                temperature: undefined,
                precipitation:undefined
            })
            }else{
                callback(undefined, {
                    temperature: 'It is currently ' + body.currently.temperature + ' degrees out.',
                    precipitation: 'There is a ' + body.currently.precipProbability + '% chance of rain'
                })
            }    
    })
}
 
module.exports = forecast