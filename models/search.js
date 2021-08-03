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

  get paramsOpenWeather() {
    return {
      appid: process.env.OPEN_WEATHER_KEY,
      units: 'metric',
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

  async searchWeather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: { ...this.paramsOpenWeather, lat, lon },
      })

      const res = await instance.get()

      const {
        weather,
        main: { temp, temp_min, temp_max },
      } = res.data

      const description =
        weather[0].description.charAt(0).toUpperCase() +
        weather[0].description.slice(1)

      return {
        description,
        min: temp_min,
        max: temp_max,
        temperature: temp,
      }
    } catch (error) {
      console.log(error, 'Place not found')
    }
  }
}

module.exports = Searches
