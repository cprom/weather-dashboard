
//create search logic
document.getElementById('search').addEventListener('click', event => {
  console.log('ping')
  event.preventDefault()
  let city = document.getElementById('city-name').value
  localStorage.setItem('history', JSON.stringify(city))
  document.getElementById('history').append(city)
  console.log(city)

  //fetch request for main weather info
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&&units=imperial&appid=25b4466b181066c6d16ec93bc2dfa591`)

    .then(r => r.json())
    .then(weather => {
      console.log(weather)
      let icon = weather.weather[0].icon
      let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
      document.getElementById('current-icon').src = iconUrl
      document.getElementById('current-city').innerHTML = weather.name
      document.getElementById('temp').innerHTML = "Temperature: " + Math.floor(weather.main.temp) + " " + String.fromCharCode(176) + "F"
      document.getElementById('humidity').innerHTML = "Humidity: " + weather.main.humidity + "%"

      //get lat/lon to use in retreiving UV index info
      let lat = weather.coord.lat
      let lon = weather.coord.lon
      console.log(lat)
      console.log(lon)

      //fetch request for UV index value
      fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=25b4466b181066c6d16ec93bc2dfa591&lat=${lat}&lon=${lon}`)
        .then(r => r.json())
        .then(uv => {
          console.log(uv)
          document.getElementById('uv').textContent = "UV Index: " + uv.value
        })





    })



    .catch(e => console.error(e))


})








