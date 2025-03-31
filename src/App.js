import { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";  
import WeatherButton from "./component/WeatherButton";  
import React from 'react';
import { Button } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);  
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);  
  const [error, setError] = useState(null);  
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];

  const getWeather = async (lat = null, lon = null, city = '') => {
    try { 
      let url;
      if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f33970a2969ca4cd76835c7adea463fe&units=metric`;
      } else if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f33970a2969ca4cd76835c7adea463fe&units=metric`;
      }

    setLoading(true);
    setError(null);
    let response = await fetch(url);

    if (!response.ok) { // api 에러 일 경우 
      throw new Error(`Error fetching weather data: ${response.status}`);
    }
    let data = await response.json();
    
    setWeather(data);
    setLoading(false);
  } catch (err) {
    setError("Failed to load weather information. Please try again.");
    console.error("Error fetching weather data:", err);
  } finally {
    setLoading(false); 
  }
}

  
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; 
      let lon = position.coords.longitude; 
      getWeather(lat, lon);
    });
  };

  useEffect(() => {
    if (!city) {
      getCurrentLocation();
    } else {
      getWeather(null, null, city);
    }
  }, [city]);

  
  return (
    <div className="container">
      {loading ? (
        <ClipLoader
          color="white"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : !error ? (
        <div>
          <div className="weather-container">
            <WeatherBox weather={weather} />
          </div>
          <WeatherButton
            cities={cities}
            setCity={setCity} 
            selectedCity={selectedCity}  
            setSelectedCity={setSelectedCity}  
          />
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}

export default App;
