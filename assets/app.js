//let searchCity = JSON.parse(localStorage.getItem('history'))
let searchCity = JSON.parse(localStorage.getItem('history')) || []

let renderHistory = () => {
  document.getElementById('history').innerHTML = ''
  for (let i = 0; i < searchCity.length; i++) {
    //console.log(searchCity[i])
    let historyElem = document.createElement('button')
    historyElem.id = searchCity[i].history
    historyElem.textContent = searchCity[i].history
    document.getElementById('history').append(historyElem)

    //console.log(historyElem)
    document.getElementById(`${searchCity[i].history}`).addEventListener('click', event => {
      console.log('ping')
    })

  }
}
//create search logic
document.getElementById('search').addEventListener('click', event => {
  //console.log('ping')
  // event.preventDefault()
  let city = document.getElementById('city-name').value
  //localStorage.setItem('history', JSON.stringify(city))

  let cityHistory = document.getElementById('city-name').value
  let historyObj = {
    history: cityHistory
  }
  searchCity.push(historyObj)
  localStorage.setItem('history', JSON.stringify(searchCity))
  //console.log(searchCity)
  renderHistory()
  //console.log(historyObj)

  //fetch request for main weather info
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=imperial&appid=25b4466b181066c6d16ec93bc2dfa591`)

    .then(r => r.json())
    .then(weather => {
      console.log(weather)
      let currentDate = new Date(weather.dt * 1000).toLocaleDateString("en-US")
      console.log(currentDate)
      let icon = weather.weather[0].icon
      let iconUrl = "https://openweathermap.org/img/w/" + icon + ".png"
      // console.log(iconUrl)
      document.getElementById('current-date').innerHTML = currentDate
      document.getElementById('current-icon').src = iconUrl
      document.getElementById('current-city').innerHTML = weather.name
      document.getElementById('temp').innerHTML = "Temperature: " + Math.floor(weather.main.temp) + " " + String.fromCharCode(176) + "F"
      document.getElementById('humidity').innerHTML = "Humidity: " + weather.main.humidity + "%"

      //get lat/lon to use in retreiving UV index info
      let lat = weather.coord.lat
      let lon = weather.coord.lon

      //console.log(lat)
      //console.log(lon)

      //fetch request for UV index value
      fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=25b4466b181066c6d16ec93bc2dfa591&lat=${lat}&lon=${lon}`)
        .then(r => r.json())
        .then(uv => {
          //console.log(uv)
          document.getElementById('uv').textContent = "UV Index: " + Math.floor(uv.value)
          if (uv.value >= 11) {
            document.getElementById('uv').classList.add('extreme-uv', 'black-text')
          }
          if (uv.value <= 10 && uv.value >= 8) {
            document.getElementById('uv').classList.add('high-uv', 'black-text')
          }
          else if (uv.value >= 6 && uv.value < 8) {
            document.getElementById('uv').classList.add('high-uv', 'black-text')
          }
          else if (uv.value >= 3 && uv.value <= 5) {
            document.getElementById('uv').classList.add('mod-uv', 'black-text')
          }
          else {
            document.getElementById('uv').classList.add('low-uv', 'black-text')
          }
        })

      //fetch 5 day forecast
      let fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&APPID=3c181a9afca27b382c5754bb9706b06f`

      let cityForecast = []

      fetch(fiveDayForecast)
        .then(r => r.json())
        .then(forecast => {
          for (let i = 0; i < forecast.list.length; i += 8) {
            let forecastArr = cityForecast.push(forecast.list[i])

          }

          let iconOne = cityForecast[0].weather[0].icon
          let iconTwo = cityForecast[1].weather[0].icon
          let iconThree = cityForecast[2].weather[0].icon
          let iconFour = cityForecast[3].weather[0].icon
          let iconFive = cityForecast[4].weather[0].icon
          let iconUrlOne = "https://openweathermap.org/img/w/" + iconOne + ".png"
          let iconUrlTwo = "https://openweathermap.org/img/w/" + iconTwo + ".png"
          let iconUrlThree = "https://openweathermap.org/img/w/" + iconThree + ".png"
          let iconUrlFour = "https://openweathermap.org/img/w/" + iconFour + ".png"
          let iconUrlFive = "https://openweathermap.org/img/w/" + iconFive + ".png"


          let theDateOne = new Date(cityForecast[0].dt * 1000).toLocaleDateString("en-US")
          let theDateTwo = new Date(cityForecast[1].dt * 1000).toLocaleDateString("en-US")
          let theDateThree = new Date(cityForecast[2].dt * 1000).toLocaleDateString("en-US")
          let theDateFour = new Date(cityForecast[3].dt * 1000).toLocaleDateString("en-US")
          let theDateFive = new Date(cityForecast[4].dt * 1000).toLocaleDateString("en-US")

          document.getElementById('day-one').innerHTML = theDateOne
          document.getElementById('iconOne').src = iconUrlOne
          document.getElementById('tempOne').innerHTML = "Temperature: " + cityForecast[0].main.temp + " " + String.fromCharCode(176) + "F"
          document.getElementById('humidityOne').innerHTML = "Humidity: " + cityForecast[0].main.humidity + " %"

          document.getElementById('day-two').innerHTML = theDateTwo
          document.getElementById('iconTwo').src = iconUrlTwo
          document.getElementById('tempTwo').innerHTML = "Temperature: " + cityForecast[1].main.temp + " " + String.fromCharCode(176) + "F"
          document.getElementById('humidityTwo').innerHTML = "Humidity: " + cityForecast[1].main.humidity + " %"

          document.getElementById('day-three').innerHTML = theDateThree
          document.getElementById('iconThree').src = iconUrlThree
          document.getElementById('tempThree').innerHTML = "Temperature: " + cityForecast[2].main.temp + " " + String.fromCharCode(176) + "F"
          document.getElementById('humidityThree').innerHTML = "Humidity: " + cityForecast[2].main.humidity + " %"

          document.getElementById('day-four').innerHTML = theDateFour
          document.getElementById('iconFour').src = iconUrlFour
          document.getElementById('tempFour').innerHTML = "Temperature: " + cityForecast[3].main.temp + " " + String.fromCharCode(176) + "F"
          document.getElementById('humidityFour').innerHTML = "Humidity: " + cityForecast[3].main.humidity + " %"

          document.getElementById('day-five').innerHTML = theDateFive
          document.getElementById('iconFive').src = iconUrlFive
          document.getElementById('tempFive').innerHTML = "Temperature: " + cityForecast[4].main.temp + " " + String.fromCharCode(176) + "F"
          document.getElementById('humidityFive').innerHTML = "Humidity: " + cityForecast[4].main.humidity + " %"



        })



    })



    .catch(e => console.error(e))


})

renderHistory()







