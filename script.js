class Weather{
    constructor(ville, temperature, description){
        this.ville = ville;
        this.temperature = temperature;
        this.description = description
    }

    displayWeather(){
        return `A ${this.ville} la température est de ${this.temperature} °C, et il fait ${this.description}.`
    }
}

const weatherArray = {
	"0":"Ensolleillé",
	"2":"Partiellement couvert",
	"3":"Nuageux",
	"45":"Brumeux",
	"48":"Légère brume",
	"61":"Pluie lègère",
	"63":"Pluie",
	"73":"Neige",
	"95":"Orages",
}

const formWeather = document.getElementById('formWeather')

formWeather.addEventListener('submit' ,async(e) =>{
    e.preventDefault()
    const searchTown = document.getElementById ('searchTown')
    const searchTownValue = searchTown.value
    const displayWeatherArea = document.getElementById('displayWeather')
    
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchTownValue}&count=1&language=fr&format=json`;
        
    try{
        const req = await fetch(url)
        
        const datas = await req.json()

        if(searchTownValue != datas.results[0].name){
            displayWeatherArea.innerText = "La ville saisie n'existe pas"
        }
 
        const lat = datas.results[0].latitude
        const long = datas.results[0].longitude


        const url_2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
        
        const req_2 = await fetch(url_2)
        
        const datas_2 = await req_2.json()
        
        const temperature = datas_2.   current_weather.temperature
        const description = weatherArray[datas_2.   current_weather.weathercode]

        const weatherResult = new Weather(datas.results[0].name, temperature, description)

        displayWeatherArea.innerText = weatherResult.displayWeather()

    }catch(e){
        console.log("Une erreur s'estproduite ", e)
    }
})

