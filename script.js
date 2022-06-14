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


fetchWeatherApi()

setInterval(() => {
    fetchWeatherApi()
}, 60000)

function fetchWeatherApi() {

    fetch('https://ws.smn.gob.ar/map_items/weather')
        .then((data) => {
            data.json().then((cities_array) => {
                cities_array.forEach(city => {

                    if (city.name === "Bahía Blanca") {
                        title.textContent = city.weather.tempDesc
                        box.textContent = city.weather.tempDesc
                        description.textContent = city.weather.description
                        wind.textContent = city.weather.wind_speed
                        windDeg.textContent = city.weather.wing_deg
                        humidity.textContent = city.weather.humidity
                    }

                })
            })

        }).catch((error) => {
            console.log(error)
        })

}
 

colorPicker.addEventListener('input', getSelectedColor)

if (localStorage.getItem("backgroundColor") != null) {
    let selectedColor = localStorage.getItem("backgroundColor")
    colorPicker.value = selectedColor
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
    } else {
        container.style.color = "#000000"
        container.style["text-shadow"] = "-2px 5px 7px #c3c3c3"
    }
}