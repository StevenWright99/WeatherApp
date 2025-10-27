import { useState, useEffect } from 'react';

import clearDay from '../assets/WeatherIcons/clear-day.svg'
import clearNight from '../assets/WeatherIcons/clear-night.svg'
import cloudy from '../assets/WeatherIcons/cloudy.svg'
import overcastDay from '../assets/WeatherIcons/overcast-day.svg'
import overcastNight from '../assets/WeatherIcons/overcast-night.svg'
import partlyCloudyDay from '../assets/WeatherIcons/partly-cloudy-day.svg'
import partlyCloudyNight from '../assets/WeatherIcons/partly-cloudy-night.svg'
import partlyCloudy from '../assets/WeatherIcons/partly-cloudy.svg'
import rainy from '../assets/WeatherIcons/rainy.svg'
import snowy from '../assets/WeatherIcons/snowy.svg'
import sunny from '../assets/WeatherIcons/sunny.svg'
import thunder from '../assets/WeatherIcons/thunder.svg'

// Contains logic for grabbing the correct Times, Icons, and Temperatures for scrolling display. These values get passed to Scroller.jsx to be displayed.
export default function HourlyForecast({ city, country, onDataReady }) {
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY;

  useEffect(() => {
    if (!city || !country) return;

    const fetchData = async () => {
      const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&country=${country}&units=I&key=${API_KEY}`;
      const result = await fetch(url);
      const data = await result.json();
      setWeatherData(data);
    };

    fetchData();
  }, [city, country]);

  useEffect(() => {
    if (!weatherData || !weatherData.data) return;

    const timestampArray = weatherData.data.map(d => d.timestamp_local);

    const formatTo12HourTime = (string) => {
      const date = new Date(string);
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    // Establishing Sunset and Sunrise variables
    const sunset = new Date();
    const sunrise = new Date();
    // Adjusting (hours, minutes, seconds) in 24hr format
    sunset.setHours(20, 0, 0) //8PM
    sunrise.setHours(30, 0, 0) //6AM next day (24+6)
    // Formatting Sunset
    const formattedSunset = new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(sunset).replace(' ', 'T');
    // Formatting Sunrise
    const formattedSunrise = new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(sunrise).replace(' ', 'T');

    // Takes percent cloud coverage from json and converts to specific icon
    const cloudPercentToImage = (clouds, time) => {
      if (time <= formattedSunset) {
        if (clouds < 40) return clearDay;
        // console.log(clouds);
        if (clouds < 60) return partlyCloudyDay;
        return overcastDay;
      } else if (time > formattedSunset && time < formattedSunrise) {
        if (clouds < 40) return clearNight;
        if (clouds < 60) return partlyCloudyNight;
        return overcastNight;
      } else {
        if (clouds < 40) return clearDay;
        if (clouds < 60) return partlyCloudyDay;
        return overcastDay;
      }
    };

    const processed = Array.from({ length: 24 }, (_, i) => ({
      time: formatTo12HourTime(timestampArray[i]),
      icon: cloudPercentToImage(weatherData.data[i]?.clouds, timestampArray[i]),
      temp: weatherData.data[i]?.temp,
    }));

    onDataReady(processed);
  }, [weatherData, onDataReady]);

  return null;
}