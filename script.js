class Weather{
    constructor(ville, temperature, description){
        this.ville = ville;
        this.temperature = temperature;
        this.description = description
    }

    displayWeather(){
        return `${this.ville}
        Température: ${this.temperature} °C
        Temps: ${this.description}.`
    }
}

const weatherArray = {
	"0":"Ensoleillé",
	"2":"Partiellement couvert",
	"3":"Nuageux",
	"45":"Brumeux",
	"48":"Légère brume",
    "51": "Légère bruine",
    "53": "Bruine",
    "55": "Bruine Epaisse",
    "56": "Léger vent frais",
    "57": "Vent frais",
	"61":"Pluie lègère",
	"63":"Pluie",
    "65": "Forte pluie",
    "66": "Légère pluie froide",
    "67": "Pluie froide",
    "71": "Neige légère",
	"73":"Neige",
    "75": "Forte neige",
    "77": "Grêle",
    "80": "Légères averses",
    "81": "Averses",
    "82": "Fortes averses",
    "85": "Lègères neige avec averses",
    "86": "Averses et neige",
	"95":"Orages",
    "96": "Légers orages avec grêles",
    "99": "Orages avec grêle",

}

const displayButton = document.getElementById('displayButton')

displayButton.addEventListener('click' ,async(e) =>{
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

        const buttonFav = document.getElementById('fav')
        const listFav = document.getElementById('listFav')

        buttonFav.addEventListener("click", (e) => {
            const ville = datas.results[0].name
            e.preventDefault()
            const stockedTown = localStorage.getItem(ville)
            if(stockedTown === null){
                localStorage.setItem(ville, ville)
                displayWeatherArea.innerHTML = "La ville a été ajouté aux favoris"
            }else{
                displayWeatherArea.innerHTML = "La ville est déjà dans les favoris"
            }
            window.addEventListener("load", ()=>{
                for(let i = 0; i < stockedTown.length; i++){
                    const newList = listFav.insertAdjacentHTML('beforeend', `<option>${ville}</option>`)
                }
            })
            listFav.addEventListener("select", ()=>{
                searchTownValue = newList
            })
        })

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

