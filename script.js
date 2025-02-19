async function runAPI(location){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=EZPFFF98QZMPLSZ9EDQ5DSCMA&unitGroup=metric`
    try{
        const data = await fetch(url)
        let response = await data.json()
        console.log(response.days[0].temp)
    } catch(error){
        console.error(error)
    }
}


function initQuery(){
    const submit = document.querySelector("#location")
    submit.addEventListener("submit", (event)=>{
        event.preventDefault()
        const input = document.getElementById("search")
        let location = input.value
        runAPI(location)
    })
}

initQuery()

