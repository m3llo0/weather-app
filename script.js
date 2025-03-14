let query = "Singapore"
let weatherInstance = null

class Weather {
    constructor(data){
        this.temp = data.days[0].temp
        this.humidity = data.days[0].humidity
        this.feelslike = data.days[0].feelslike
        this.windspeed = data.days[0].windspeed
        this.uvindex = data.days[0].uvindex
        this.precip = data.days[0].precipprob
        this.description = data.days[0].description
        this.conditions = data.days[0].conditions
    }

    static async runAPI(location){
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=EZPFFF98QZMPLSZ9EDQ5DSCMA&unitGroup=metric`
        try{
            const response = await fetch(url)
            let data = await response.json()
            const weatherInstance = new Weather(data)
            return weatherInstance
        } catch(error){
            console.error(error)
        }
    }

}

document.addEventListener("DOMContentLoaded", async function defaultWeather(){
    weatherInstance= await Weather.runAPI(query)
    updateUI()
    updateImage()
})
    
function initQuery(){
    const submit = document.querySelector("#location")
    submit.addEventListener("submit", async (event)=>{
        event.preventDefault()
        const input = document.getElementById("search")
        query = input.value
        weatherInstance = await Weather.runAPI(query)
        updateUI()
        updateImage()
    })
}
initQuery()

function updateImage(){
    const image = document.querySelector(".weather-pic img")
    const weatherImages = {
        "rain" : "assets/rainy.png",
        "cloudy": "assets/cloudy.png",
        "thunderstorm": "assets/thunderstorm.png",
        "clear": "assets/sunny.png",
        "partially cloudy": "assets/partially-cloudy.png",
        "rain, partially cloudy": "assets/sun-rain.png"
    }
    image.src = "assets/cloudy.png"
    for(let key of Object.keys(weatherImages)){
        if(weatherInstance.conditions.toLowerCase().includes(key)){
            image.src = weatherImages[key]
            return
        }
    }
}


function updateUI(){

    const today = new Date()
    const day = today.getDate()
    const month = today.toLocaleString('en-US', { month: 'short' })
    const year = today.getFullYear()
    const dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' });
    const formattedDate = `${day} ${month}, ${year}`

    const elements = [
        {selector:"p.location", text:query},
        {selector:"#temp h1", text:`${weatherInstance.temp}°C`},
        {selector: "#temp h2", text:`Feels like ${weatherInstance.feelslike}°C`},
        {selector: "#description", text: weatherInstance.description},
        {selector: ".wind.speed p", text: `Wind Speed: ${weatherInstance.windspeed}km/h`},
        {selector: ".humidity p", text: `Humidity: ${weatherInstance.humidity}%`},
        {selector: ".uv.index p", text: `UV Index: ${weatherInstance.uvindex}`},
        {selector: ".ppt p", text: `Chance of Rain: ${weatherInstance.precip}%`},
        {selector: "#datetime h1", text: dayOfWeek},
        {selector: "#datetime h2", text: formattedDate}
    ]

    elements.forEach(({selector, text}) => {
        const element = document.querySelector(selector)
        if (element){
            element.textContent = text
        }
    })

}

