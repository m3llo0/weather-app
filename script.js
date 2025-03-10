class Weather {
    constructor(data){
        this.temp = data.days[0].temp
        this.humidity = data.days[0].humidity
        this.feelslike = data.days[0].feelslike
        this.windspeed = data.days[0].windspeed
        this.uvindex = data.days[0].uvindex
        this.precip = data.days[0].precipprob
        this.description = data.days[0].description
    }

    static async runAPI(location){
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=EZPFFF98QZMPLSZ9EDQ5DSCMA&unitGroup=metric`
        try{
            const response = await fetch(url)
            let data = await response.json()
            const weatherInstance = new Weather(data)
            console.log(weatherInstance.description)
            return weatherInstance
        } catch(error){
            console.error(error)
        }
    }
    
}

function initQuery(){
    const submit = document.querySelector("#location")
    submit.addEventListener("submit", (event)=>{
        event.preventDefault()
        const input = document.getElementById("search")
        let location = input.value
        Weather.runAPI(location)
    })
}

initQuery()

function createForecast(){
    const box = document.querySelector("#forecast")
    for (let i=0; i<10; i++){
        const forecast = document.createElement("div")
        forecast.className = "daily"
        box.appendChild(forecast)
    }
}

createForecast()


