console.log("Hi! I'm from Js, it's working!")

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput')
    const searchButton = document.getElementById('searchButton')

    searchInput.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault
            searchButton.click()
        }
    })

    searchButton.addEventListener('click', function () {
        const city = searchInput.value
        console.log("Searching for :" + city)

        fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5ab97d5aad1415abeb100033251611&q=${city}&days=1&aqi=no&alerts=no`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('cityName').innerText = data.location.name
                document.getElementById('countryName').innerText = data.location.country

                document.getElementById('temparatureValue').innerText = data.current.temp_c + " °C"
                document.getElementById('feelsLikeValue').innerText = data.current.feelslike_c + " °C"
                document.getElementById('minTemparatureValue').innerText = data.current.dewpoint_c + " °C"

                document.getElementById('conditionText').innerText = data.current.condition.text


                const date = new Date(data.current.last_updated)

                const options = {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                }

                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
                document.getElementById('lastUpdated').innerText = formattedDate

                document.getElementById('conditionIcon').src = data.current.condition.icon

                document.getElementById('sunRiseTime').innerText = data.forecast.forecastday[0].astro.sunrise
                document.getElementById('sunSetTime').innerText = data.forecast.forecastday[0].astro.sunset

                document.getElementById('windSpeedValue').innerText = data.current.wind_kph + " km/h"
                document.getElementById('humidityValue').innerText = data.current.humidity + " %"

                document.getElementById('cloudCoverValue').innerText = data.current.cloud + " %"

                const uvIndex = data.current.uv
                let uvCategory = ""
                if(uvIndex > 0 && uvIndex <= 2) {
                    uvCategory = "Low"
                } else if(uvIndex > 2 && uvIndex <= 5) {
                    uvCategory = "Moderate"
                } else if(uvIndex > 5 && uvIndex <= 7) {
                    uvCategory = "High"
                } else if(uvIndex > 7 && uvIndex <= 10) {
                    uvCategory = "Very High"
                } else if(uvIndex > 10) {
                    uvCategory = "Extreme"
                }

                document.getElementById('uvIndexValue').innerText = Math.round(uvIndex) + " (" + uvCategory + ")"

                document.getElementById('pressureValue').innerText = data.current.pressure_mb + " hPa"
                document.getElementById('visibilityValue').innerText = data.current.vis_km + " km"
            })
    })

})


// console.log()