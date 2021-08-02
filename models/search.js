const axios = require('axios')

class Searches {
  history = ['Vilassar', 'Barcelona', 'Osaka', 'Tokyo']

  constructor() {
    //TODO: read database
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'en',
    }
  }

  async searchPlace(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      })

      const res = await instance.get()

      return res.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }))
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Searches
