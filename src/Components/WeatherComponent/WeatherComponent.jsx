import React, { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherComponent = () => {

    const API_KEY = '76c33fccf408446ab4770123231409'
    const [searchCity, setSearchCity] = useState('')
    const [locationData, setLocationData] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()


    const handleSearch = async() => {
        
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCity}`)
        const data = response.data
        setLocationData(data.location)
        setWeatherData(data.current)    }

    const handleSearchCity = (event) => {
        setSearchCity(event.target.value)
    }


    useEffect( () => {
        navigator.geolocation.getCurrentPosition( (position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        },
        () => {
            alert('Unable to retrieve location')
        })
    }, [])

    useEffect( () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
        .then( response  =>{
            setLocationData(response.data.location)
            setWeatherData(response.data.current)
        })
        console.log(locationData,weatherData)
    }, [latitude,longitude])

  return (
    <div>
            <input 
                type='text'
                placeholder='Enter city'
                value={searchCity}
                onChange={handleSearchCity}
            />
            <button onClick={handleSearch}> Search </button>
            <p>{locationData.name}</p>
            <p>{weatherData.temp_c} &deg;C</p>
            <p>{locationData.country}</p>
        
    </div>
  )
}

export default WeatherComponent
