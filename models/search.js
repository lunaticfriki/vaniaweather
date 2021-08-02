const axios = require('axios')

class Searches {
  history = ['Vilassar', 'Barcelona', 'Osaka', 'Tokyo']

  constructor() {
    //TODO: read database
  }

  async searchPlace(place = '') {
    // console.log('Place:', place)
    const res = await axios.get('https://reqres.in/api/users?page=2')
    console.log(res.data.per_page)

    return []
  }
}

module.exports = Searches
