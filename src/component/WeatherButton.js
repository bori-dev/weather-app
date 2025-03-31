import React from 'react';
import { Button } from 'react-bootstrap';
import '../'

const WeatherButton = ({ cities, setCity, selectedCity, setSelectedCity}) => {
  return (
    <div className="button-container">
       <Button 
        onClick={() => {
          setCity(null);
          setSelectedCity(null);  
        }} 
        variant="outline-light"
        className={`weather-button ${selectedCity === null ? 'selected' : ''}`} 
      >
        Current Location
      </Button>
      
      {cities.map((item, index) => {
        return (
          <Button
          key={index} 
          variant="outline-light"
          onClick={() => {
            setCity(item);
            setSelectedCity(item); 
          }} 
           className={`weather-button ${selectedCity === item ? 'selected' : ''}`}  
        >
          {item}
        </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
