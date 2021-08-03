const fs = require('fs')
const axios = require('axios')

class Searches {
  history = []
  dbPath = './db/database.json'

  constructor() {
    this.readDB()
  }

  get capitalizedHistory() {
    return this.history.map((place) => {
      let words = place.split(' ')
      words = words.map((word) => word[0].toUpperCase() + word.substring(1))
      return words.join(' ')
    })
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

  addHistory(place = '') {
    if (this.history.includes(place.toLowerCase())) {
      return
    }
    this.history = this.history.splice(0, 5)
    this.history.unshift(place.toLowerCase())
    this.saveDB()
  }

  saveDB() {
    const payload = { history: this.history }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    const data = JSON.parse(info)
    this.history = data.history
  }
}

module.exports = Searches
