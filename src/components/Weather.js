import React, { useEffect, useRef, useState } from "react"
import "./Weather.css"
import {CiSearch}  from "react-icons/ci"

const apiKey = "7b1a0006993927fc494dab4b15512e9b"

  const Weather = () => {

    const inputSearch = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const search = async (city) => {
      if (city === "") {
        alert("Enter City Name")
        return;
      }
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        setWeatherData({
          temperature: data.main.temp,
          location: data.name
        })
      }  catch (e) {
          setWeatherData(false)
          console.log("Error in fetching weather data")
      }
    }

    useEffect(() => {
        search("Delhi")
    }, [])

  
     
    return (
        <div className="weather">
          <div className="container">    
            <input ref={inputSearch} type="text" placeholder="Search" />
            <div>
            <CiSearch className="search" onClick={() => search(inputSearch.current.value)} />
            </div>  
          </div>  
          <div>
            <p className="temp">{weatherData.temperature}<sup>o</sup>C</p>
            <p className="country">{weatherData.location}</p>
          </div>  
        </div>
    )
}


export default Weather