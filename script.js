if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}


let box = document.querySelector('.temp')
let title = document.querySelector('title')
fetch('https://ws.smn.gob.ar/map_items/weather')
    .then((data) => {
        data.json().then((cities_array) => {
            cities_array.forEach(city => {
                if (city.name === 'Bahía Blanca') {
                    box.textContent = city.weather.tempDesc
                    title.textContent = "Temp: " + city.weather.tempDesc
                }
            })
        })

    }).catch((e) => {
        console.log(e)
    })