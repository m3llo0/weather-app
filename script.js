async function runAPI(){
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=EZPFFF98QZMPLSZ9EDQ5DSCMA"
    try{
        const data = await fetch(url)
        let response = await data.json()
        console.log(response.days[0].temp)
    } catch(error){
        console.error(error)
    }
}

runAPI()

