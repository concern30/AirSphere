import React, { useState, useEffect, useRef } from "react";
import "./Airsphere.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Airsphere = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clear_icon,
    "02n": clear_icon,
    "03d": clear_icon,
    "03n": clear_icon,
    "04d": clear_icon,
    "04n": clear_icon,
    "09d": clear_icon,
    "09n": clear_icon,
    "10d": clear_icon,
    "10n": clear_icon,
    "13d": clear_icon,
    "13n": clear_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp), // Corrected typo
        location: data.name,
        icon: icon,
      });

      console.log(data);
    } catch (error) {
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("London"); // Default city to search on load
  }, []);

  const handleSearch = () => {
    const cityName = inputRef.current.value;
    search(cityName);
  };

  return (
    <div className="Airsphere">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>

      {weather ? (
        <>
          <img
            src={weather.icon} // Dynamically set icon based on weather data
            alt="Weather Icon"
            className="Airsphere-icon"
          />
          <p className="temperature">{weather.temperature}°c</p>
          <p className="location">{weather.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weather.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No weather data available. Please search for a city.</p>
      )}
    </div>
  );
};

export default Airsphere;
