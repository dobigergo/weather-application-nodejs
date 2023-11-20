const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const reportArea = document.querySelector(".weather-report-area")
const spinner = document.querySelector(".spinner-area")

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    try{
        spinner.classList.remove("hidden")
        fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    reportArea.innerHTML = createErrorMessageCard(data.error)
                }
                else{
                    reportArea.innerHTML = createMessageCard(data.place_name,data.icon,data.temperature,data.feelslike,data.windspeed,data.precip,data.description)
                }
                spinner.classList.add("hidden")
        })
     })
    }
    catch(e){
        reportArea.innerHTML = createErrorMessageCard("Something went wrong! Please try again later!")
        spinner.classList.add("hidden")
    }
})

const createMessageCard = function(place_name,src,temperature,feelslike,windspeed,precip,description){
    return '<div class="weather-card"><img src='+ src +
     '></img><div class="weather-info"><p>'+place_name+'</p><p>Temperature: ' + temperature +
     '°C</p><p>Feels like: '+ feelslike +
     '°C</p><p>Wind speed: ' + windspeed + 
     'km/h</p><p>Rain: '+precip+'%</p><p>' +
     description + '</p></div></div>'
}

const createErrorMessageCard = function(message){
    return '<div class="message-card"><div class="message-container"><svg xmlns="http://www.w3.org/2000/svg"' +
    'xmlns:xlink="http://www.w3.org/1999/xlink"' +
    'xmlns:krita="http://krita.org/namespaces/svg/krita"' +
    'xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"' +
    'width="240pt"' +
    'height="240pt"' +
    'viewBox="0 0 240 240">' +
'<defs/>' +
'<path id="shape0" transform="translate(48, 57.6)" fill="none" stroke="#b70013" stroke-width="7.68" stroke-linecap="square" stroke-linejoin="bevel" d="M76.8 0L0 134.4L153.6 134.4Z" sodipodi:nodetypes="cccc"/><path id="shape1" transform="translate(124.8, 86.4)" fill="none" stroke="#b70013" stroke-width="7.68" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" d="M0 0L0 67.2" sodipodi:nodetypes="cc"/><path id="shape2" transform="translate(124.8, 153.6)" fill="none" stroke="#b70013" stroke-width="7.68" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2" d="M0 9.6L0 0" sodipodi:nodetypes="cc"/><ellipse id="shape3" transform="translate(120, 174)" rx="4.8" ry="4.19999999999999" cx="4.8" cy="4.19999999999999" fill="none" stroke="#b70013" stroke-width="7.68" stroke-linecap="square" stroke-linejoin="bevel"/>' +
'</svg>' +
 message + '</div></div>'
}