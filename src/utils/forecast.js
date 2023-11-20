const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=85efa368e7f44ca520a6bbf543a90991&query=" + encodeURIComponent('' + latitude + ',' + longitude)
    request({url,json:true},(error,{body}) => {
        if(error){
            callback({error:'Unable to connect to the server!'},undefined)
        }
        else if(body.error){
            callback({error:'Unable to find location!'},undefined)
        }
        else{
            const data = {
                icon: body.current.weather_icons[0],
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                windspeed: body.current.wind_speed,
                precip: body.current.precip
            }
            callback(undefined,data)
        }
    })
}

module.exports = {
    forecast : forecast
}