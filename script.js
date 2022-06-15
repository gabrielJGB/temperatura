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

const options = {
    body:'contenido',
    icon:'img/png-icon.png',
    vibrate: [100,50,100],
    data:{primaryKey:1}
}


Notification.requestPermission(status=>{
    console.log(status)
})
navigator.serviceWorker.getRegistration().then(reg=>{
    reg.showNotification('Titulo',options)
})

// fetchWeatherApi()

// setInterval(() => {
//         fetchWeatherApi()
//     }, 300000) //15 min

// function fetchWeatherApi() {

//     fetch('https://ws.smn.gob.ar/map_items/weather')
//         .then((data) => {
//             data.json().then((cities_array) => {
//                 cities_array.forEach(city => {

//                     if (city.name === "Bahía Blanca") {
//                         title.textContent = city.weather.tempDesc
//                         box.textContent = city.weather.tempDesc
//                         description.textContent = city.weather.description
//                         wind.textContent = city.weather.wind_speed
//                         windDeg.textContent = city.weather.wing_deg
//                         humidity.textContent = city.weather.humidity
//                         updated.textContent = "Actualizado a las " + formatTime(city.updated)
//                     }

//                 })
//             })

//         }).catch((error) => {
//             console.log(error)
//         })
// }

function formatTime(timestamp) {
    var date = new Date(timestamp * 1000);
    return (('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2));

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
        updated.style.color = "#b9b9b9"
    } else {
        container.style.color = "#000000"
        container.style["text-shadow"] = "-2px 5px 7px #c3c3c3"
        updated.style.color = "#4c4c4c"
    }
}