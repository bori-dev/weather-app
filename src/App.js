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
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];

  const getWeather = async (lat = null, lon = null, city = '') => {
    let url;
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f33970a2969ca4cd76835c7adea463fe&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f33970a2969ca4cd76835c7adea463fe&units=metric`;
    }

    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    
    setWeather(data);
    setLoading(false);
  };

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
      ) : (
        <>
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity} 
          />
        </>
      )}
    </div>
  );
}

export default App;
