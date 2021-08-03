require('colors')
require('dotenv').config()
const {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
} = require('./helpers/inquirer')
const Searches = require('./models/search')

const main = async () => {
  const searches = new Searches()

  let option

  do {
    option = await inquirerMenu()

    switch (option) {
      case 1:
        const place = await readInput('Place: ')

        const places = await searches.searchPlace(place)
        const id = await listPlaces(places)

        if (id === places.length + 1) continue

        const selectedPlace = places.find((place) => place.id === id)
        const placeName = `${selectedPlace.name}`.cyan

        searches.addHistory(selectedPlace.name)

        const weather = await searches.searchWeather(
          selectedPlace.lat,
          selectedPlace.lng
        )

        const city = `${selectedPlace.name}`.magenta
        const longitude = `${selectedPlace.lng}`.magenta
        const latitude = `${selectedPlace.lat}`.magenta
        const temperature = `${weather.temperature}`.magenta
        const min = `${weather.min}`.magenta
        const max = `${weather.max}`.magenta
        const description = `${weather.description}`.magenta

        console.log(`\n- Weather report of : ${placeName} -\n`.magenta)
        console.log(`City: ${city}`.cyan)
        console.log(`Longitude: ${longitude}`.cyan)
        console.log(`Latitude: ${latitude}`.cyan)
        console.log(`Temperature: ${temperature}°C`.cyan)
        console.log(`Min: ${min}°C`.cyan)
        console.log(`Max: ${max}°C`.cyan)
        console.log(`Curent weather: ${description}`.cyan)
        break
      case 2:
        console.log()
        searches.capitalizedHistory.forEach((place, idx) => {
          const index = `${idx + 1}. `.cyan
          console.log(`${index}${place}`)
        })
        break
    }

    option !== 3 && (await pause())
  } while (option !== 3)
}

main()
