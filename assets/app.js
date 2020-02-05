//let searchCity = JSON.parse(localStorage.getItem('history'))
let searchCity = JSON.parse(localStorage.getItem('history')) || []

let renderHistory = () => {
  document.getElementById('history').innerHTML = ''
  for (let i = 0; i < searchCity.length; i++) {
    //console.log(searchCity[i])
    let historyElem = document.createElement('button')
    historyElem.textContent = searchCity[i].history
    document.getElementById('history').append(historyElem)

  }
}
//create search logic
document.getElementById('search').addEventListener('click', event => {
  //console.log('ping')
  event.preventDefault()
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
      //console.log(weather)
      let icon = weather.weather[0].icon
      let iconUrl = "https://openweathermap.org/img/w/" + icon + ".png"
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
          else if (uv.value <= 2) {
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



            //cityForecast.push(cityForecast)
            console.log(cityForecast)
            //console.log(iconArr)
            //console.log(tempArr)
            //document.getElementById('weather-info').innerHTML = cityForecast[0]
          }

          //console.log(forecast.list)
          // console.log(forecast.list[0])
        })



    })



    .catch(e => console.error(e))


})

renderHistory()







