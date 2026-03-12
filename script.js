// Création d'une classe qui stock les valeurs tels que la ville, la température, et la description
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

// Tableau traduisant le weathercode ce qui correspond à la description
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

// Fonction affichant de manière permanente la liste de villes en favoris stockées dans le localStorage
const listFav = document.getElementById('listFav')
window.addEventListener("load", ()=>{
    const villes = Object.keys(localStorage)
    villes.forEach(ville =>{
        const newList = listFav.insertAdjacentHTML('beforeend', `<option>${ville}</option>`)
    })
})

// Mise en place d'un API pour récupérer les données météos de liens API
const displayButton = document.getElementById('displayButton')

displayButton.addEventListener('click' ,async(e) =>{
    e.preventDefault()

    // listFav.addEventListener("change", (e) =>{
    //     const getFav = e.target.value

    //     searchTown = getFav
    // })

    // La partie ci-dessous permet d'inclure le nom de la ville saisi au niveau de l'input par l'utilisateur, et l'inclure au lien
    const searchTown = document.getElementById ('searchTown')
    const searchTownValue = searchTown.value
    const displayWeatherArea = document.getElementById('displayWeather')
    
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchTownValue}&count=1&language=fr&format=json`;
        
    try{
        // On fetch l'url et récupère le données voulues
        const req = await fetch(url)
        
        const datas = await req.json()

        // Condition si la ville n'existe pas dans la page
        if(searchTownValue != datas.results[0].name){
            displayWeatherArea.innerText = "La ville saisie n'existe pas"
        }

        // Récupérer les données du tableau "results" à l'indice 0
        const lat = datas.results[0].latitude
        const long = datas.results[0].longitude

        // Mise en place du localStorage pour stocker la ville voulue en favoris
        const buttonFav = document.getElementById('fav')
        buttonFav.addEventListener("click", (e) => {
            e.preventDefault()
            const ville = datas.results[0].name
            const stockedTown = localStorage.getItem(ville)
            // Stocker la ville si elle n'est pas déjà dans le localStorage
            if(stockedTown === null){
                localStorage.setItem(ville, ville)
                displayWeatherArea.innerHTML = "La ville a été ajouté aux favoris"
                insertAdjacentHTML('beforeend', `<option>${ville}</option>`)
            }else{
                displayWeatherArea.innerHTML = "La ville est déjà dans les favoris"
            }
        })

        // Utiliser les données de latitude et longitude et inclure les variables associées au second url permettant de récupérer la météo d'une ville spécifique
        const url_2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
        
        const req_2 = await fetch(url_2)
        
        const datas_2 = await req_2.json()
        
        // Récupérer les données de température et weathercode (description) du tableau current_weather
        const temperature = datas_2.   current_weather.temperature
        const description = weatherArray[datas_2.   current_weather.weathercode]

        // Associer les données obtenues aux variables de la classe Weather créé précédement
        const weatherResult = new Weather(datas.results[0].name, temperature, description)

        // Afficher le tout dans la div respective selon la méthode displayWeather()
        displayWeatherArea.innerText = weatherResult.displayWeather()

    }catch(e){
        console.log("Une erreur s'est produite ", e)
    }
})

