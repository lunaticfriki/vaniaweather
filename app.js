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

        const selectedPlace = places.find((place) => place.id === id)
        const placeName = `${selectedPlace.name}`.green

        console.log(`\n- Info of : ${placeName} -\n`.magenta)
        console.log('City:', selectedPlace.name)
        console.log('Latitude:', selectedPlace.lat)
        console.log('Longitude:', selectedPlace.lng)
        break
      case 2:
        break
      case 3:
        break
    }

    option !== 3 && (await pause())
  } while (option !== 3)
}

main()
