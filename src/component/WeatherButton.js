import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  return (
    <div>
      <Button onClick={() => setCity(null)} variant="outline-light">
        현재 위치
      </Button>

      {cities.map((item, index) => {
        return (
          <Button
            key={index} 
            variant="outline-light"
            onClick={() => setCity(item)} 
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
