const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) + '&apiKey=6250f96e96814624825cb8cd5eb588aa'
    request({url, json:true},(error,{body}) => {
        if(error){
            callback({error:'Unable to connect to location services!'},undefined)
        }else if(body.error || body.features.length === 0){
            callback({error:'Unable to find location!'},undefined)
        }
        else{
            const coordinates = body.features[0].geometry.coordinates
            const longitude = coordinates[0];
            const latitude = coordinates[1];
            data = {
                place_name : body.features[0].properties.city,
                state: body.features[0].properties.state,
                country: body.features[0].properties.country,
                longitude:longitude,
                latitude:latitude}
            callback(undefined,data)
        }
    })
}

module.exports = {
    geocode:geocode
}