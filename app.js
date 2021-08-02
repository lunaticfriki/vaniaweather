require('colors')
const { inquirerMenu, pause, readInput } = require('./helpers/inquirer')
const Searches = require('./models/search')

const main = async () => {
  const searches = new Searches()

  let option

  do {
    option = await inquirerMenu()

    switch (option) {
      case 1:
        const place = await readInput('Place: ')
        await searches.searchPlace(place)
        console.log('\n', place)
        console.log('\nCity info\n'.magenta)
        console.log('City:')
        console.log('Latitude:')
        console.log('Longitude:')
        console.log('Temperature:')
        console.log('Min.')
        console.log('Max.')
        console.log('Current weather:')
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
