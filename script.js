if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

let container = document.querySelector('.container')
let box = document.querySelector('.temp')
let description = document.querySelector('.description')
let wind = document.querySelector('.wind')
let windDeg = document.querySelector('.wind-deg')
let humidity = document.querySelector('.humidity')
let title = document.querySelector('title')
let colorPicker = document.querySelector('.color-picker')
let updated = document.querySelector('.updated')
let cityList = document.querySelector('#city-list')
let response

fetchWeatherApi()
getLocation()

setInterval(() => {
    let min = new Date().getMinutes()
    if (min % 10 === 0) {
        fetchWeatherApi()
    }
}, 60000)


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            let ak = '87eac2828250da32166d49f93bcbf215'

            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${ak}`)
                .then((data) => {
                    data.json().then((result) => {
                        let city = result[0].name
                        selectCity(city)
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        },(error)=>{
            selectCity("Bahía Blanca")
        })

    } 
}

function fetchWeatherApi() {

    fetch('https://ws.smn.gob.ar/map_items/weather')
        .then((data) => {
            data.json().then((cities_array) => {
                response = cities_array
                getCityList(cities_array)
                
            })

        }).catch((err) => {
            console.err(error)
        })
}

cityList.addEventListener('change', (e) => {
    selectCity(e.target.value)
})

function selectCity(selectedCity) {
    if(selectedCity === 'Punta Alta'){
        selectedCity = "Bahía Blanca"
    }
    response.forEach(city => {
        if (city.name === selectedCity) {
            title.textContent = city.weather.tempDesc
            box.textContent = city.weather.tempDesc
            description.textContent = city.weather.description
            wind.textContent = city.weather.wind_speed
            windDeg.textContent = city.weather.wing_deg
            humidity.textContent = city.weather.humidity
            updated.textContent = "Actualizado a las " + formatTime(city.updated)
            return true
        }
    })

    cityList.value = selectedCity
}

function getCityList(cities) {
    cities.forEach((city) => {
        let elem = document.createElement('option')
        elem.value = city.name
        elem.textContent = city.name
        cityList.appendChild(elem)
    })
}

function formatTime(timestamp) {
    var date = new Date(timestamp * 1000);
    return (('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2));

}

colorPicker.addEventListener('input', getSelectedColor)

if (localStorage.getItem("backgroundColor") != null) {
    let selectedColor = localStorage.getItem("backgroundColor").value
    changeColor(selectedColor)
} else {
    colorPicker.value = "#141414"
}

function getSelectedColor(e) {
    let selectedColor = e.currentTarget.value
    localStorage.setItem("backgroundColor", selectedColor);
    changeColor(selectedColor)
}



function changeColor(selectedColor) {
    container.style.backgroundColor = selectedColor

    if (tinycolor(selectedColor).isDark()) {
        container.style.color = "#ffffff"
        container.style["text-shadow"] = "-2px 5px 7px black"
        updated.style.color = "#b9b9b9"
    } else {
        container.style.color = "#000000"
        container.style["text-shadow"] = "-2px 5px 7px #c3c3c3"
        updated.style.color = "#4c4c4c"
    }
}


box.addEventListener('click', () => {
    window.open("https://www.google.com.ar/search?q=clima", "_blank");
})